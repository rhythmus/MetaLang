#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import { Registry } from '@metalang/core';
import { fetchCategoryMembers, normalizeWiktionaryTitle } from './lib/wiktionary.js';
import { classifyTerms } from './lib/classify.js';
import { exportToTSV } from './lib/export.js';
import { mergeTsvIntoSeed } from './lib/merge.js';

const program = new Command();

program
    .name('metalang-ingest')
    .description('CLI tool to harvest linguistic terms from Wiktionary')
    .version('0.1.0');

program
    .command('harvest')
    .description('Harvest terms from a Wiktionary category')
    .argument('<lang>', 'Language code (e.g., el, nl, en)')
    .option('-t, --type <type>', 'Type of terms to harvest (pos, labels)', 'pos')
    .option('-o, --output <file>', 'Output JSON file')
    .action(async (lang, options) => {
        const categoryMap: Record<string, string> = {
            'pos': `${lang}:Parts of speech`,
            'labels': `${lang}:Usage labels`
        };

        const category = categoryMap[options.type] || `${lang}:${options.type}`;
        console.log(chalk.blue(`🚀 Harvesting terms for category: ${chalk.bold(category)}...`));

        try {
            const members = await fetchCategoryMembers(category);
            const terms = members.map(m => ({
                id: m.pageid,
                title: normalizeWiktionaryTitle(m.title),
                raw_title: m.title
            }));

            console.log(chalk.green(`✅ Harvested ${chalk.bold(terms.length)} terms.`));

            if (options.output) {
                fs.writeFileSync(options.output, JSON.stringify(terms, null, 2));
                console.log(chalk.cyan(`💾 Results saved to ${options.output}`));
            } else {
                console.log(JSON.stringify(terms.slice(0, 10), null, 2));
                if (terms.length > 10) {
                    console.log(chalk.gray(`... and ${terms.length - 10} more terms.`));
                }
            }
        } catch (error: any) {
            console.error(chalk.red(`❌ Error harvesting: ${error.message}`));
            process.exit(1);
        }
    });

program
    .command('classify')
    .description('Classify harvested terms against MetaLang registry')
    .argument('<file>', 'Harvested JSON file')
    .option('-d, --domains <file>', 'Domains TSV file')
    .option('-c, --concepts <file>', 'Concepts TSV file')
    .option('-o, --output <file>', 'Output classification JSON file')
    .action(async (file, options) => {
        console.log(chalk.blue(`🧠 Classifying terms from ${chalk.bold(file)}...`));

        try {
            const rawData = fs.readFileSync(file, 'utf-8');
            const terms = JSON.parse(rawData);

            const registry = new Registry();
            const domainsPath = options.domains || '../../ontology/domains.tsv';
            const conceptsPath = options.concepts || '../../ontology/concepts.tsv';

            if (fs.existsSync(domainsPath) && fs.existsSync(conceptsPath)) {
                registry.loadTSVData(
                    fs.readFileSync(domainsPath, 'utf-8'),
                    fs.readFileSync(conceptsPath, 'utf-8')
                );
            } else {
                console.warn(chalk.yellow(`⚠️ Data files not found at ${domainsPath} or ${conceptsPath}`));
            }

            const mappings = classifyTerms(terms, registry);
            const matchedCount = mappings.filter(m => m.suggested_guid).length;

            console.log(chalk.green(`✅ Classification complete. Matched ${chalk.bold(matchedCount)}/${mappings.length} terms.`));

            if (options.output) {
                fs.writeFileSync(options.output, JSON.stringify(mappings, null, 2));
                console.log(chalk.cyan(`💾 Results saved to ${options.output}`));
            } else {
                console.log(JSON.stringify(mappings.filter(m => m.suggested_guid).slice(0, 10), null, 2));
            }
        } catch (error: any) {
            console.error(chalk.red(`❌ Error classifying: ${error.message}`));
            process.exit(1);
        }
    });

program
    .command('export')
    .description('Export candidate mappings to TSV for curation')
    .argument('<file>', 'Classification JSON file')
    .argument('<output>', 'Output TSV file')
    .action((file, output) => {
        console.log(chalk.blue(`📤 Exporting candidates from ${chalk.bold(file)} to ${chalk.bold(output)}...`));

        try {
            const rawData = fs.readFileSync(file, 'utf-8');
            const mappings = JSON.parse(rawData);
            const tsv = exportToTSV(mappings);

            fs.writeFileSync(output, tsv);
            console.log(chalk.green(`✅ Export complete.`));
        } catch (error: any) {
            console.error(chalk.red(`❌ Error exporting: ${error.message}`));
            process.exit(1);
        }
    });

program
    .command('merge')
    .description('Merge curated TSV entries into a seed JSON file')
    .argument('<tsv>', 'Curated TSV file')
    .argument('<seed>', 'Target seed JSON file')
    .option('--dry-run', 'Show what would be merged without writing')
    .option('--domain <id>', 'Default domain for new concepts')
    .action((tsv, seed, options) => {
        console.log(chalk.blue(`🔄 Merging ${chalk.bold(tsv)} into ${chalk.bold(seed)}...`));
        try {
            mergeTsvIntoSeed(tsv, seed, options);
        } catch (error: any) {
            console.error(chalk.red(`❌ Error merging: ${error.message}`));
            process.exit(1);
        }
    });

program.parse();
