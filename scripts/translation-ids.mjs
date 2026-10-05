import ts from 'typescript';

// Parse translation calls, not HTML ids, unrelated objects or commented examples.
export function extractTranslationIds(content, filename = 'source.tsx') {
  const source = ts.createSourceFile(
    filename,
    content,
    ts.ScriptTarget.Latest,
    true,
    filename.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const components = new Set();
  const functions = new Set();
  for (const statement of source.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      statement.moduleSpecifier.text !== '@docusaurus/Translate'
    )
      continue;
    const clause = statement.importClause;
    if (clause?.name) components.add(clause.name.text);
    if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) {
      for (const item of clause.namedBindings.elements) {
        if ((item.propertyName ?? item.name).text === 'translate') functions.add(item.name.text);
        if ((item.propertyName ?? item.name).text === 'default') components.add(item.name.text);
      }
    }
  }
  const ids = new Set();
  const literal = (node) =>
    node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
      ? node.text
      : undefined;
  function collect(node) {
    const id = literal(node);
    if (id !== undefined) ids.add(id);
  }
  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      functions.has(node.expression.text)
    ) {
      const message = node.arguments[0];
      if (message && ts.isObjectLiteralExpression(message)) {
        for (const property of message.properties) {
          if (ts.isPropertyAssignment(property) && property.name.text === 'id')
            collect(property.initializer);
        }
      }
    }
    if (
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
      ts.isIdentifier(node.tagName) &&
      components.has(node.tagName.text)
    ) {
      for (const attribute of node.attributes.properties) {
        if (ts.isJsxAttribute(attribute) && attribute.name.text === 'id') {
          const value = attribute.initializer;
          collect(value && ts.isJsxExpression(value) ? value.expression : value);
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return [...ids].sort();
}

export function missingTranslationIds(ids, translations) {
  return ids.filter((id) => !Object.hasOwn(translations, id));
}
