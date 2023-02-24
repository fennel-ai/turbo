const REGEX = /^{%\s*([\w-]+)\s*((?:\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|\S+))?\s*)*)%}\n?([\s\S]*?)^{%\s*end\1\s*%}/gm;

// This isn't really ideal but will hold us over for now.
// Gitbook use syntax like {% hint style="info" %} which is not valid markdown.
// Adding a custom parser didn't work as next-mdx-remote is handling it, and the plugins run after mdx itself, so it trips up before we can add support for the syntax in the chain.
export function sanitize(page) {
  // Search the page for all occurrences of the {% tag %} syntax
  return page.replace(REGEX, (_, tagName, properties, content) => {
    // Split the properties into an array of key-value pairs
    const propsRegex = /(\w+)\s*=\s*("[^"]*"|'[^']*'|\S+)/g;
    const props = [];

    let propMatch;
    while ((propMatch = propsRegex.exec(properties))) {
      const [_, key, value] = propMatch;
      props.push({
        key: key === "style" ? "type" : key,
        value: value.replace(/^(['"])(.*)\1$/, "$2"),
      });
    }

    if (tagName === "hint" || tagName == "content-ref") {
      // If we have a hint || content-ref tag, we take the capture group values and convert it to jsx syntax so MDX knows what to do with it.
      // i.e. {% hint style="info" %} becomes <Hint type="info">content</Hint>
      // (We have to special-case the style prop as it's a reserved word in jsx)
      const tag = `${tagName.charAt(0).toUpperCase()}${tagName.slice(1)}`;
      return `<${tag} ${props
        .map(({ key, value }) => `${key}="${value}"`)
        .join(" ")}>${content.trim()}</${tag}>`;
    } else {
      // The only other occurences of this so far are for {% code %} - prism takes over so we can just return the inner string here and ignore the Gitbook syntax.
      return content.trim();
    }
  });
}
