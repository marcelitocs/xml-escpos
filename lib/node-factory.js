"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeFactory = void 0;
const align_node_1 = __importDefault(require("./nodes/align-node"));
const barcode_node_1 = __importDefault(require("./nodes/barcode-node"));
const bold_node_1 = __importDefault(require("./nodes/bold-node"));
const break_line_node_1 = __importDefault(require("./nodes/break-line-node"));
const document_node_1 = __importDefault(require("./nodes/document-node"));
const line_feed_node_1 = __importDefault(require("./nodes/line-feed-node"));
const qrcode_node_1 = __importDefault(require("./nodes/qrcode-node"));
const small_node_1 = __importDefault(require("./nodes/small-node"));
const text_node_1 = __importDefault(require("./nodes/text-node"));
const text_line_node_1 = __importDefault(require("./nodes/text-line-node"));
const underline_node_1 = __importDefault(require("./nodes/underline-node"));
const white_mode_node_1 = __importDefault(require("./nodes/white-mode-node"));
const paper_cut_node_1 = __importDefault(require("./nodes/paper-cut-node"));
const image_node_1 = __importDefault(require("./nodes/image-node"));
const open_cash_drawer_node_1 = __importDefault(require("./nodes/open-cash-drawer-node"));
const print_mode_1 = __importDefault(require("./nodes/print-mode"));
class NodeFactory {
    static create(nodeType, node) {
        switch (nodeType) {
            case 'align': return new align_node_1.default(node);
            case 'barcode': return new barcode_node_1.default(node);
            case 'bold': return new bold_node_1.default(node);
            case 'break-line': return new break_line_node_1.default(node);
            case 'document': return new document_node_1.default(node);
            case 'line-feed': return new line_feed_node_1.default(node);
            case 'qrcode': return new qrcode_node_1.default(node);
            case 'small': return new small_node_1.default(node);
            case 'text': return new text_node_1.default(node);
            case 'text-line': return new text_line_node_1.default(node);
            case 'underline': return new underline_node_1.default(node);
            case 'white-mode': return new white_mode_node_1.default(node);
            case 'paper-cut': return new paper_cut_node_1.default(node);
            case 'open-cash-drawer': return new open_cash_drawer_node_1.default(node);
            case 'image': return new image_node_1.default(node);
            case 'print-mode': return new print_mode_1.default(node);
            default: return null;
        }
    }
}
exports.NodeFactory = NodeFactory;
