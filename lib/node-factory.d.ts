import AlignNode from './nodes/align-node';
import BarcodeNode from './nodes/barcode-node';
import BoldNode from './nodes/bold-node';
import BreakLineNode from './nodes/break-line-node';
import DocumentNode from './nodes/document-node';
import LineFeedNode from './nodes/line-feed-node';
import QRcodeNode from './nodes/qrcode-node';
import SmallNode from './nodes/small-node';
import TextNode from './nodes/text-node';
import TextLineNode from './nodes/text-line-node';
import UnderlineNode from './nodes/underline-node';
import WhiteModeNode from './nodes/white-mode-node';
import PaperCutNode from './nodes/paper-cut-node';
import ImageNode from './nodes/image-node';
import OpenCashDrawerNode from './nodes/open-cash-drawer-node';
import PrintModeNode from './nodes/print-mode';
export declare class NodeFactory {
    static create(nodeType: String, node: any): AlignNode | BarcodeNode | BoldNode | BreakLineNode | DocumentNode | LineFeedNode | QRcodeNode | SmallNode | TextNode | TextLineNode | UnderlineNode | WhiteModeNode | PaperCutNode | ImageNode | OpenCashDrawerNode | PrintModeNode;
}
