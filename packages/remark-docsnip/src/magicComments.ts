export enum MagicCommentType {
    HIGHLIGHT = 'highlight'
}

export type MagicCommentAttribute = {
    name: string; 
    value: string | string[];
}

export type ParseMagicCommentResponse = {
    snippet: string;
    attributes: MagicCommentAttribute[];
}

type ProcessedLine = {
    index: number;
    text: string;
    highlight: boolean;
}

const regexCache = new Map<MagicCommentType, RegExp>();

function getRegexForType(type: MagicCommentType): RegExp {
    if (!regexCache.has(type)) {
        const regex = new RegExp(`# docsnip-${type}(?:[ \t])?([a-zA-Z0-9-]*)?`, 'm');
        regexCache.set(type, regex);
    }
    return regexCache.get(type)!;
}

function cleanLine(line: string, magicComment: string): string {
    return line.replace(magicComment, '').trimEnd()
}

function* processSnippet(type: MagicCommentType, snippet: string): Generator<ProcessedLine> {
    const regex = getRegexForType(type);
    const lines = snippet.split('\n');

    let inRange: boolean = false;
    let shouldHighlight: boolean = false;
    let removed = 0;

    for (let index = 0; index < lines.length; index++) {
        let text = lines[index];
        regex.lastIndex = 0; // Good practice, but not strictly required here with going line-by-line
        
        const match = regex.exec(text);
        const modifier: string | undefined = match?.[1]?.trim();
        
        let highlightNextLine: boolean = false;

        if (match) {
            text = cleanLine(text, match[0]);

            highlightNextLine = modifier === 'next-line';
            inRange = modifier === 'start' ? true : modifier === 'end' ? false : inRange;

            // If there IS a match but NO modifier, then highlight the current line
            if (!modifier) {
                shouldHighlight = true;
            }
       
            // If there was a match, but with the comment stripped there's no more text on this line 
            // then we can skip it an increment the removed line count to offset future line numbers.
            if (!text.trim()) {
                removed++;
                shouldHighlight = highlightNextLine;
                continue;
            }
        }

        yield {
            index: index - removed,
            text,
            highlight: inRange || shouldHighlight
        };

        shouldHighlight = highlightNextLine;
    }
}

// Taking the content of a specific snippet, generate an object containing
// properties defined as comments in the snippet itself.
export const parseMagicComments = (snippet: string | undefined, magic: MagicCommentType[] = [MagicCommentType.HIGHLIGHT]): ParseMagicCommentResponse | undefined => {
    if (!snippet) return undefined;

    let processedSnippet = snippet;
    let attributes = [] as MagicCommentAttribute[];

    for (const type of magic) {
        switch (type) {
            case MagicCommentType.HIGHLIGHT: {
                let lines = [];
                let highlighted = [];

                for (const line of processSnippet(type, processedSnippet)) {
                    lines.push(line.text)

                    if (line.highlight) {
                        // Highlighted lines don't work off of indices and instead start at 1.
                        highlighted.push(line.index + 1);
                    }
                }

                processedSnippet = lines.join('\n');

                attributes.push({
                    name: type,
                    value: highlighted.join(', ')
                });
            }
            default: {
                continue
            }
        }
    }

    return {
        snippet: processedSnippet,
        attributes,
    };
}