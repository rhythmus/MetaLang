import axios from 'axios';

export interface WiktionaryMember {
    pageid: number;
    ns: number;
    title: string;
}

export interface WiktionaryResponse {
    continue?: {
        cmcontinue: string;
        continue: string;
    };
    query: {
        categorymembers: WiktionaryMember[];
    };
}

const WIKTIONARY_API_URL = 'https://en.wiktionary.org/w/api.php';

/**
 * Fetches members of a Wiktionary category.
 * Translates categories like "el:Parts of speech" or "el:Usage labels".
 */
export async function fetchCategoryMembers(category: string, limit = 500): Promise<WiktionaryMember[]> {
    const results: WiktionaryMember[] = [];
    let cmcontinue: string | undefined = undefined;

    do {
        const params: any = {
            action: 'query',
            list: 'categorymembers',
            cmtitle: `Category:${category}`,
            cmlimit: limit,
            format: 'json',
            origin: '*'
        };

        if (cmcontinue) {
            params.cmcontinue = cmcontinue;
        }

        const response = await axios.get<WiktionaryResponse>(WIKTIONARY_API_URL, {
            params,
            headers: {
                'User-Agent': 'MetaLangIngestBot/0.1.0 (https://github.com/woutersoudan/metalang; rhythmvs@gmail.com)'
            }
        });
        const data = response.data;

        if (data.query?.categorymembers) {
            results.push(...data.query.categorymembers);
        }

        cmcontinue = data.continue?.cmcontinue;
    } while (cmcontinue);

    return results;
}

/**
 * Normalizes Wiktionary titles (removes "Category:" prefix and language codes).
 */
export function normalizeWiktionaryTitle(title: string): string {
    return title.replace(/^Category:/, '').split(':').pop() || title;
}
