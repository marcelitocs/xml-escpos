"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_node_1 = require("../xml-node");
class TextNode extends xml_node_1.XMLNode {
    constructor(node) {
        super(node);
    }
    open(bufferBuilder) {
        if (/\d+:\d+/.test(this.attributes.size)) {
            let size = new String(this.attributes.size).split(':').map(entry => parseInt(entry));
            bufferBuilder.setCharacterSize(size[0], size[1]);
        }
        let text = this.getContent().replace(/&nbsp;/g, ' ').replace(/&lt;tab&gt;/g, '  ').replace(/&amp;/g, '&').replace(/&#x3D;/g, '=').replace(/&#x2F;/g, '/').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
        bufferBuilder.printText(text);
        return bufferBuilder;
    }
    close(bufferBuilder) {
        bufferBuilder.resetCharacterSize();
        return bufferBuilder;
    }
}
exports.default = TextNode;
