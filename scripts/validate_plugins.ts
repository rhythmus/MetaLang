import fs from 'fs';
import path from 'path';
import AjvNS from 'ajv';
import addFormatsNS from 'ajv-formats';

const Ajv = (AjvNS as any).default || AjvNS;
const addFormats = (addFormatsNS as any).default || addFormatsNS;
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Load schema
const schemaPath = path.resolve(__dirname, '../packages/schema/schemas/plugin-manifest.schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const validate = ajv.compile(schema);

const pluginPaths = [
    'packages/plugin-ud/src/index.ts',
    'packages/plugin-eagles/src/index.ts',
    'packages/plugin-nl-taalunie/src/manifest.json',
    'packages/plugin-en/src/manifest.json',
    'packages/plugin-pt/src/manifest.json',
    'packages/plugin-no/src/manifest.json',
    'packages/plugin-cs/src/manifest.json',
    'packages/plugin-fr/src/manifest.json',
    'packages/plugin-br/src/manifest.json',
    'packages/plugin-de/src/manifest.json',
    'packages/plugin-pl/src/manifest.json',
    'packages/plugin-ro/src/manifest.json'
];

async function validatePlugins() {
    console.log('🔍 Validating plugin manifests...');
    let totalErrors = 0;

    for (const pluginPath of pluginPaths) {
        const fullPath = path.resolve(__dirname, '..', pluginPath);
        console.log(`\nChecking ${path.basename(pluginPath)}...`);

        try {
            let manifest: any;
            if (pluginPath.endsWith('.json')) {
                manifest = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
            } else {
                // For .ts files, we'll import them
                // We need to handle the export name convention
                const module = await import(fullPath);
                const manifestName = path.basename(pluginPath, '.ts').toUpperCase().replace(/-/g, '_') + '_PLUGIN_MANIFEST';

                // Try common patterns we've used
                manifest = module.UD_PLUGIN_MANIFEST || module.EAGLES_PLUGIN_MANIFEST || module.manifest;

                if (!manifest) {
                    console.warn(`⚠️ Could not find manifest export in ${pluginPath}. Skipping.`);
                    continue;
                }
            }

            const valid = validate(manifest);
            if (!valid) {
                console.error(`❌ Validation failed for ${pluginPath}:`);
                console.error(ajv.errorsText(validate.errors));
                totalErrors += validate.errors?.length || 0;
            } else {
                console.log(`✅ ${pluginPath} is valid.`);
            }
        } catch (err: any) {
            console.error(`❌ Error reading ${pluginPath}: ${err.message}`);
            totalErrors++;
        }
    }

    if (totalErrors > 0) {
        console.log(`\n💥 Total errors found: ${totalErrors}`);
        process.exit(1);
    } else {
        console.log('\n✨ All plugins validated successfully!');
    }
}

validatePlugins();
