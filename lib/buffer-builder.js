"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RASTER_MODE = exports.STATUS_TYPE = exports.BITMAP_SCALE = exports.QR_EC_LEVEL = exports.BARCODE_LABEL_POSITION = exports.BARCODE_LABEL_FONT = exports.BARCODE_WIDTH = exports.BARCODE_SYSTEM = exports.CHARACTER_CODE_TABLE = exports.ALIGNMENT = exports.UNDERLINE_MODE = exports.BufferBuilder = void 0;
const command_1 = require("./command");
const mutable_buffer_1 = require("mutable-buffer");
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const image_1 = __importDefault(require("./image"));
class BufferBuilder {
    constructor(defaultSettings = true) {
        this.defaultSettings = defaultSettings;
        this.buffer = new mutable_buffer_1.MutableBuffer();
        this.hasGSCommand = true;
        this.doEmphasise = false;
        this.buffer.write(command_1.Command.ESC_init);
        this.resetCharacterCodeTable();
    }
    end() {
        return this;
    }
    resetCharacterCodeTable() {
        this.buffer.write(command_1.Command.ESC_t(CHARACTER_CODE_TABLE.PC860));
        this.encode = "cp860";
        return this;
    }
    setCharacterSize(width = 0, height = 0) {
        if (this.hasGSCommand) {
            let size = (width << 4) + height;
            this.buffer.write(command_1.Command.GS_exclamation(size));
        }
        else {
            let mode = (width > 0 ? (1 << 5) : 0) + (height > 0 ? (1 << 4) : 0) + (this.doEmphasise ? (1 << 3) : 0) + 1;
            this.buffer.write(command_1.Command.ESC_exclamation(mode));
        }
        return this;
    }
    setPrintMode(setting) {
        this.hasGSCommand = setting;
        if (setting)
            this.resetCharacterEncoding();
        this.resetCharacterSize();
        return this;
    }
    resetCharacterSize() {
        if (this.hasGSCommand) {
            this.buffer.write(command_1.Command.GS_exclamation(0));
        }
        else {
            this.buffer.write(command_1.Command.ESC_exclamation(1));
        }
        return this;
    }
    resetCharacterEncoding() {
        this.buffer.write(command_1.Command.FS_ob_C_fe_utf);
        return this;
    }
    startCompressedCharacter() {
        this.buffer.write(command_1.Command.ESC_M(1));
        return this;
    }
    endCompressedCharacter() {
        this.buffer.write(command_1.Command.ESC_M(0));
        return this;
    }
    startBold() {
        this.hasGSCommand ? this.buffer.write(command_1.Command.ESC_E(1)) : this.doEmphasise = true;
        return this;
    }
    endBold() {
        this.hasGSCommand ? this.buffer.write(command_1.Command.ESC_E(0)) : this.doEmphasise = false;
        return this;
    }
    startUnderline(underlineMode = UNDERLINE_MODE.TWO_POINTS_OF_COARSE) {
        this.buffer.write(command_1.Command.ESC_minus(underlineMode));
        return this;
    }
    endUnderline() {
        this.buffer.write(command_1.Command.ESC_minus(48));
        return this;
    }
    startAlign(alignment) {
        this.buffer.write(command_1.Command.ESC_a(alignment));
        return this;
    }
    resetAlign() {
        return this.startAlign(ALIGNMENT.LEFT);
    }
    startWhiteMode() {
        this.buffer.write(command_1.Command.GS_B(1));
        return this;
    }
    endWhiteMode() {
        this.buffer.write(command_1.Command.GS_B(0));
        return this;
    }
    startReverseMode() {
        this.buffer.write(command_1.Command.ESC_rev(1));
        return this;
    }
    endReverseMode() {
        this.buffer.write(command_1.Command.ESC_rev(0));
        return this;
    }
    printBarcode(data, barcodeSystem, width = BARCODE_WIDTH.DOT_375, height = 162, labelFont = BARCODE_LABEL_FONT.FONT_A, labelPosition = BARCODE_LABEL_POSITION.BOTTOM, leftSpacing = 0) {
        this.buffer.write(command_1.Command.GS_w(width)); // width
        this.buffer.write(command_1.Command.GS_h(height)); // height
        this.buffer.write(command_1.Command.GS_x(leftSpacing)); // left spacing
        this.buffer.write(command_1.Command.GS_f(labelFont)); // HRI font
        this.buffer.write(command_1.Command.GS_H(labelPosition)); // HRI font
        this.buffer.write(command_1.Command.GS_K(barcodeSystem, data.length)); // data is a string in UTF-8
        this.buffer.write(data, "ascii");
        return this;
    }
    printQRcode(data, model, size, ecLevel) {
        let x = data.length + 3;
        let pL = Math.floor(x % 256);
        let pH = Math.floor(x / 256);
        this.buffer.write(command_1.Command.QR_MODEL(model));
        this.buffer.write(command_1.Command.QR_SIZE(size));
        this.buffer.write(command_1.Command.EC_LEVEL(ecLevel));
        this.buffer.write(command_1.Command.STORE_QR(pL, pH));
        this.buffer.write(data, "ascii");
        this.buffer.write(command_1.Command.PRINT_QR());
        return this;
    }
    printBitmap(image, width, height, scale = BITMAP_SCALE.NORMAL) {
        //TODO
        return this;
    }
    printText(text) {
        const buffer = iconv_lite_1.default.encode(text, this.encode);
        this.buffer.write(buffer);
        return this;
    }
    printTextLine(text) {
        return this.printText(text).breakLine();
    }
    breakLine(lines = 0) {
        this.buffer.write(command_1.Command.ESC_d(lines));
        return this;
    }
    lineFeed() {
        this.buffer.write(command_1.Command.LF);
        return this;
    }
    transmitStatus(statusType) {
        this.buffer.write(command_1.Command.DLE_EOT(statusType));
        return this;
    }
    build() {
        if (this.defaultSettings) {
            this.lineFeed();
            this.buffer.write(command_1.Command.ESC_init);
        }
        return this.buffer.flush();
    }
    /**
     * Register Paper Cut Action
     * @return BufferBuilder
     */
    paperCut() {
        this.buffer.write(command_1.Command.GS_v(66, 50));
        return this;
    }
    /**
     * Register open cash drawer action
     * @return BufferBuilder
     */
    openCashDrawer() {
        // kick drawer 1, pin 2
        this.buffer.write(command_1.Command.CD_KICK_1());
        // kick drawer 2, pin 5
        this.buffer.write(command_1.Command.CD_KICK_2());
        return this;
    }
    printImage(image, mode) {
        if (!(image instanceof image_1.default)) {
            throw new TypeError("not supported");
        }
        const raster = image.toRaster();
        this.buffer.write(command_1.Command.GS_v0(mode));
        this.buffer.writeUInt16LE(raster.width);
        this.buffer.writeUInt16LE(raster.height);
        this.buffer.write(raster.data);
        return this;
    }
}
exports.BufferBuilder = BufferBuilder;
var UNDERLINE_MODE;
(function (UNDERLINE_MODE) {
    UNDERLINE_MODE[UNDERLINE_MODE["ONE_POINT_OF_COARSE"] = 49] = "ONE_POINT_OF_COARSE";
    UNDERLINE_MODE[UNDERLINE_MODE["TWO_POINTS_OF_COARSE"] = 50] = "TWO_POINTS_OF_COARSE";
})(UNDERLINE_MODE = exports.UNDERLINE_MODE || (exports.UNDERLINE_MODE = {}));
var ALIGNMENT;
(function (ALIGNMENT) {
    ALIGNMENT[ALIGNMENT["LEFT"] = 48] = "LEFT";
    ALIGNMENT[ALIGNMENT["CENTER"] = 49] = "CENTER";
    ALIGNMENT[ALIGNMENT["RIGHT"] = 50] = "RIGHT";
})(ALIGNMENT = exports.ALIGNMENT || (exports.ALIGNMENT = {}));
var CHARACTER_CODE_TABLE;
(function (CHARACTER_CODE_TABLE) {
    CHARACTER_CODE_TABLE[CHARACTER_CODE_TABLE["PC437"] = 0] = "PC437";
    CHARACTER_CODE_TABLE[CHARACTER_CODE_TABLE["KATAKANA"] = 1] = "KATAKANA";
    CHARACTER_CODE_TABLE[CHARACTER_CODE_TABLE["PC850"] = 2] = "PC850";
    CHARACTER_CODE_TABLE[CHARACTER_CODE_TABLE["PC860"] = 3] = "PC860";
    CHARACTER_CODE_TABLE[CHARACTER_CODE_TABLE["PC863"] = 4] = "PC863";
    CHARACTER_CODE_TABLE[CHARACTER_CODE_TABLE["PC865"] = 5] = "PC865";
    CHARACTER_CODE_TABLE[CHARACTER_CODE_TABLE["PC866"] = 17] = "PC866";
})(CHARACTER_CODE_TABLE = exports.CHARACTER_CODE_TABLE || (exports.CHARACTER_CODE_TABLE = {}));
var BARCODE_SYSTEM;
(function (BARCODE_SYSTEM) {
    BARCODE_SYSTEM[BARCODE_SYSTEM["UPC_A"] = 65] = "UPC_A";
    BARCODE_SYSTEM[BARCODE_SYSTEM["UPC_E"] = 66] = "UPC_E";
    BARCODE_SYSTEM[BARCODE_SYSTEM["EAN_13"] = 67] = "EAN_13";
    BARCODE_SYSTEM[BARCODE_SYSTEM["EAN_8"] = 68] = "EAN_8";
    BARCODE_SYSTEM[BARCODE_SYSTEM["CODE_39"] = 69] = "CODE_39";
    BARCODE_SYSTEM[BARCODE_SYSTEM["ITF"] = 70] = "ITF";
    BARCODE_SYSTEM[BARCODE_SYSTEM["CODABAR"] = 71] = "CODABAR";
    BARCODE_SYSTEM[BARCODE_SYSTEM["CODE_93"] = 72] = "CODE_93";
    BARCODE_SYSTEM[BARCODE_SYSTEM["CODE_128"] = 73] = "CODE_128";
})(BARCODE_SYSTEM = exports.BARCODE_SYSTEM || (exports.BARCODE_SYSTEM = {}));
var BARCODE_WIDTH;
(function (BARCODE_WIDTH) {
    BARCODE_WIDTH[BARCODE_WIDTH["DOT_250"] = 2] = "DOT_250";
    BARCODE_WIDTH[BARCODE_WIDTH["DOT_375"] = 3] = "DOT_375";
    BARCODE_WIDTH[BARCODE_WIDTH["DOT_560"] = 4] = "DOT_560";
    BARCODE_WIDTH[BARCODE_WIDTH["DOT_625"] = 5] = "DOT_625";
    BARCODE_WIDTH[BARCODE_WIDTH["DOT_750"] = 6] = "DOT_750";
})(BARCODE_WIDTH = exports.BARCODE_WIDTH || (exports.BARCODE_WIDTH = {}));
var BARCODE_LABEL_FONT;
(function (BARCODE_LABEL_FONT) {
    BARCODE_LABEL_FONT[BARCODE_LABEL_FONT["FONT_A"] = 48] = "FONT_A";
    BARCODE_LABEL_FONT[BARCODE_LABEL_FONT["FONT_B"] = 49] = "FONT_B";
})(BARCODE_LABEL_FONT = exports.BARCODE_LABEL_FONT || (exports.BARCODE_LABEL_FONT = {}));
var BARCODE_LABEL_POSITION;
(function (BARCODE_LABEL_POSITION) {
    BARCODE_LABEL_POSITION[BARCODE_LABEL_POSITION["NOT_PRINT"] = 48] = "NOT_PRINT";
    BARCODE_LABEL_POSITION[BARCODE_LABEL_POSITION["ABOVE"] = 49] = "ABOVE";
    BARCODE_LABEL_POSITION[BARCODE_LABEL_POSITION["BOTTOM"] = 50] = "BOTTOM";
    BARCODE_LABEL_POSITION[BARCODE_LABEL_POSITION["ABOVE_BOTTOM"] = 51] = "ABOVE_BOTTOM";
})(BARCODE_LABEL_POSITION = exports.BARCODE_LABEL_POSITION || (exports.BARCODE_LABEL_POSITION = {}));
var QR_EC_LEVEL;
(function (QR_EC_LEVEL) {
    QR_EC_LEVEL[QR_EC_LEVEL["L"] = 0] = "L";
    QR_EC_LEVEL[QR_EC_LEVEL["M"] = 1] = "M";
    QR_EC_LEVEL[QR_EC_LEVEL["Q"] = 2] = "Q";
    QR_EC_LEVEL[QR_EC_LEVEL["H"] = 3] = "H";
})(QR_EC_LEVEL = exports.QR_EC_LEVEL || (exports.QR_EC_LEVEL = {}));
var BITMAP_SCALE;
(function (BITMAP_SCALE) {
    BITMAP_SCALE[BITMAP_SCALE["NORMAL"] = 48] = "NORMAL";
    BITMAP_SCALE[BITMAP_SCALE["DOUBLE_WIDTH"] = 49] = "DOUBLE_WIDTH";
    BITMAP_SCALE[BITMAP_SCALE["DOUBLE_HEIGHT"] = 50] = "DOUBLE_HEIGHT";
    BITMAP_SCALE[BITMAP_SCALE["FOUR_TIMES"] = 51] = "FOUR_TIMES";
})(BITMAP_SCALE = exports.BITMAP_SCALE || (exports.BITMAP_SCALE = {}));
var STATUS_TYPE;
(function (STATUS_TYPE) {
    STATUS_TYPE[STATUS_TYPE["PRINTER_STATUS"] = 1] = "PRINTER_STATUS";
    STATUS_TYPE[STATUS_TYPE["OFFLINE_STATUS"] = 2] = "OFFLINE_STATUS";
    STATUS_TYPE[STATUS_TYPE["ERROR_STATUS"] = 3] = "ERROR_STATUS";
    STATUS_TYPE[STATUS_TYPE["PAPER_ROLL_SENSOR_STATUS"] = 4] = "PAPER_ROLL_SENSOR_STATUS";
})(STATUS_TYPE = exports.STATUS_TYPE || (exports.STATUS_TYPE = {}));
var RASTER_MODE;
(function (RASTER_MODE) {
    RASTER_MODE[RASTER_MODE["NORMAL"] = 0] = "NORMAL";
    RASTER_MODE[RASTER_MODE["DOUBLE_WIDTH"] = 1] = "DOUBLE_WIDTH";
    RASTER_MODE[RASTER_MODE["DOUBLE_HEIGHT"] = 2] = "DOUBLE_HEIGHT";
    RASTER_MODE[RASTER_MODE["DOUBLE_WIDTH_HEIGHT"] = 3] = "DOUBLE_WIDTH_HEIGHT";
})(RASTER_MODE = exports.RASTER_MODE || (exports.RASTER_MODE = {}));
