export enum MagicCommentType {
    HIGHLIGHT = 'highlight'
}

export type MagicCommentProps = {
    [MagicCommentType.HIGHLIGHT]: number[]
}

export type ParseMagicCommentResponse = {
    snippet: string;
    props: MagicCommentProps;
}

type ProcessedLine = {
    index: number;
    text: string;
    highlight: boolean;
}

function* processSnippet(type: MagicCommentType, snippet: string): Generator<ProcessedLine> {
    const regex = new RegExp(`# docsnip-${type}(?:[ \t])?([a-z-A-Z0-9]*)?`, 'g');
    const lines = snippet.split('\n');

    let inRange: boolean = false;
    let shouldHighlight: boolean = false;
    let removed = 0;

    for (let index = 0; index < lines.length; index++) {
        let text = lines[index];
        const match = regex.exec(text);
        let modifier = '';

        if (match) {
            text = text.replace(match[0], '').trimEnd();
            modifier = match[1]?.trim() || '';
            shouldHighlight = modifier !== 'end';
            inRange = modifier === 'start' ? true : modifier === 'end' ? false : inRange;
        }

        // If there is no more text on this line 
        if (!text.trim()) {
            removed++;
            continue;
        }

        yield {
            index: index - removed,
            text,
            highlight: shouldHighlight || inRange
        };

        shouldHighlight = inRange || modifier === 'next-line';
    }
}

// Taking the content of a specific snippet, generate an object containing
// properties defined as comments in the snippet itself.
export const parseMagicComments = (snippet: string | undefined, magic: MagicCommentType[] = [MagicCommentType.HIGHLIGHT]): ParseMagicCommentResponse | undefined => {
    if (!snippet) return undefined;

    let processedSnippet = snippet;
    let props = {} as MagicCommentProps;

    for (const type of magic) {
        switch (type) {
            case MagicCommentType.HIGHLIGHT: {
                props[type] = [];

                let lines = [];
                let highlighted = props[type];

                for (const line of processSnippet(type, processedSnippet)) {
                    lines.push(line.text)

                    if (line.highlight) {
                        highlighted.push(line.index);
                    }
                }

                processedSnippet = lines.join('\n');
            }
            default: {
                continue
            }
        }
    }

    return {
        snippet: processedSnippet,
        props,
    };
}