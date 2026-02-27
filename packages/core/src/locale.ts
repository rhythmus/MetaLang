import { parse, stringify } from 'bcp-47';
import { bcp47Normalize } from 'bcp-47-normalize';
import tags from 'language-tags';

/**
 * Locale Utility for MetaLang
 * Handles BCP 47 normalization and CLDR-based localization.
 */
export class Locale {
    /**
     * Normalize a language tag to its canonical BCP 47 form.
     * Example: 'en-us' -> 'en-US'
     */
    public static normalize(tag: string): string {
        try {
            return bcp47Normalize(tag);
        } catch (e) {
            console.warn(`Failed to normalize BCP 47 tag: ${tag}`, e);
            return tag;
        }
    }

    /**
     * Check if a tag is theoretically valid according to IANA registry.
     */
    public static isValid(tag: string): boolean {
        return tags.check(tag);
    }

    /**
     * Get the endonym for a language (the name in its own language).
     * Example: 'de' -> 'Deutsch'
     */
    public static getEndonym(tag: string): string {
        try {
            const canonical = this.normalize(tag);
            const formatter = new Intl.DisplayNames([canonical], { type: 'language' });
            return formatter.of(canonical) || canonical;
        } catch (e) {
            return tag;
        }
    }

    /**
     * Get the exonym (localized name) for a language.
     * Example: getExonym('nl', 'fr') -> 'néerlandais'
     */
    public static getExonym(tag: string, targetLang: string): string {
        try {
            const canonicalTag = this.normalize(tag);
            const canonicalTarget = this.normalize(targetLang);
            const formatter = new Intl.DisplayNames([canonicalTarget], { type: 'language' });
            return formatter.of(canonicalTag) || canonicalTag;
        } catch (e) {
            return tag;
        }
    }

    /**
     * Extract the base language from a tag.
     * Example: 'en-GB' -> 'en'
     */
    public static getBaseLanguage(tag: string): string {
        const schema = parse(tag);
        return schema.language || tag;
    }

    /**
     * Get the ancestry of a tag for fallback logic.
     * Example: 'zh-Hans-CN' -> ['zh-Hans-CN', 'zh-Hans', 'zh']
     */
    public static getAncestry(tag: string): string[] {
        const normalized = this.normalize(tag);
        const parts = normalized.split('-');
        const ancestry: string[] = [];
        for (let i = parts.length; i > 0; i--) {
            ancestry.push(parts.slice(0, i).join('-'));
        }
        return ancestry;
    }

    /**
     * Get the standardized name of a region (ISO 3166-1 alpha-2).
     * Example: getRegionName('BE', 'en') -> 'Belgium'
     */
    public static getRegionName(regionCode: string, targetLang: string): string {
        try {
            const canonicalTarget = this.normalize(targetLang);
            const formatter = new Intl.DisplayNames([canonicalTarget], { type: 'region' });
            return formatter.of(regionCode.toUpperCase()) || regionCode;
        } catch (e) {
            return regionCode;
        }
    }

    /**
     * Get the endonym for a region.
     * Note: This estimates the region's own name using the base language of the tag if provided.
     * Example: getRegionEndonym('BE', 'nl-BE') -> 'België'
     */
    public static getRegionEndonym(regionCode: string, localeContext: string): string {
        try {
            const canonicalTarget = this.normalize(localeContext);
            const formatter = new Intl.DisplayNames([canonicalTarget], { type: 'region' });
            return formatter.of(regionCode.toUpperCase()) || regionCode;
        } catch (e) {
            return regionCode;
        }
    }
}
