export enum MagicCommentType {
    HIGHLIGHT = 'highlight'
}

export type MagicCommentProps = {
    [MagicCommentType.HIGHLIGHT]: string;
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

function cleanLine(line: string, magicComment: string): string {
    return line.replace(magicComment, '').trimEnd()
}

function* processSnippet(type: MagicCommentType, snippet: string): Generator<ProcessedLine> {
    const regex = new RegExp(`# docsnip-${type}(?:[ \t])?([a-z-A-Z0-9]*)?`);
    const lines = snippet.split('\n');

    let inRange: boolean = false;
    let shouldHighlight: boolean = false;
    let removed = 0;

    for (let index = 0; index < lines.length; index++) {
        let text = lines[index];
        const match = regex.exec(text);
        let modifier = '';

        if (match) {
            console.log(text, '||', match[0], '===', cleanLine(text, match[0]));
            text = cleanLine(text, match[0]);
            modifier = match[1]?.trim() || '';

            inRange = modifier === 'start' ? true : modifier === 'end' ? false : inRange;
            shouldHighlight = shouldHighlight || !modifier;
       
            // If there was a comment, but with the comment stripped is no more text on this line 
            // then we can skip it an increment the removed line count to offset future line numbers.
            if (!text.trim()) {
                removed++;
                shouldHighlight = modifier === 'next-line';
                continue;
            }
        }

        yield {
            index: index - removed,
            text,
            highlight: shouldHighlight || inRange
        };

        shouldHighlight = modifier === 'next-line';
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
                props[type] = highlighted.join(', ');
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