import * as monaco from 'monaco-editor'
// js 有内置提示
const hints = [
  // 'v-modle',
  // 'v-slot',
  // 'v-bind',
  // 'props',
  // 'mounted',
  // 'method',
  // 'data',
  // 'computed',
  // 'watch',
  // 'updated'
];
function createCompleter(getExtraHints) {
    const createSuggestions = function (model, textUntilPosition) {
        let text = model.getValue();
        // eslint-disable-next-line
        textUntilPosition = textUntilPosition.replace(/[\*\[\]@\$\(\)]/g, "").replace(/(\s+|\.)/g, " ");
        let arr = textUntilPosition.split(/[\s;]/);
        let activeStr = arr[arr.length - 1];
        let len = activeStr.length;
        let rexp = new RegExp("([^\\w]|^)" + activeStr + "\\w*", "gim");
        let match = text.match(rexp);
        let mergeHints = Array.from(new Set([...getExtraHints(model), ...hints]))
            .sort()
            .filter(ele => {
                let rexp = new RegExp(ele.substr(0, len), "gim");
                return (match && match.length === 1 && ele === activeStr) ||
                    ele.length === 1 ? false : activeStr.match(rexp);
            });
        return mergeHints.map(ele => ({
            label: ele,
            kind: monaco.languages.CompletionItemKind.Text,
            documentation: ele,
            insertText: ele
        }));
    };
    return {
        provideCompletionItems(model, position) {
            let textUntilPosition = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column
            });
            return { suggestions: createSuggestions(model, textUntilPosition) };
        }
    }
}
export default createCompleter;
