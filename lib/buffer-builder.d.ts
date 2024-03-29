import Image from "./image";
export declare class BufferBuilder {
    private defaultSettings;
    private buffer;
    private hasGSCommand;
    private doEmphasise;
    private encode;
    constructor(defaultSettings?: boolean);
    end(): BufferBuilder;
    resetCharacterCodeTable(): BufferBuilder;
    setCharacterSize(width?: number, height?: number): BufferBuilder;
    setPrintMode(setting: boolean): BufferBuilder;
    resetCharacterSize(): BufferBuilder;
    resetCharacterEncoding(): BufferBuilder;
    startCompressedCharacter(): BufferBuilder;
    endCompressedCharacter(): BufferBuilder;
    startBold(): BufferBuilder;
    endBold(): BufferBuilder;
    startUnderline(underlineMode?: UNDERLINE_MODE): BufferBuilder;
    endUnderline(): BufferBuilder;
    startAlign(alignment: ALIGNMENT): BufferBuilder;
    resetAlign(): BufferBuilder;
    startWhiteMode(): BufferBuilder;
    endWhiteMode(): BufferBuilder;
    startReverseMode(): BufferBuilder;
    endReverseMode(): BufferBuilder;
    printBarcode(data: string, barcodeSystem: BARCODE_SYSTEM, width?: BARCODE_WIDTH, height?: number, labelFont?: BARCODE_LABEL_FONT, labelPosition?: BARCODE_LABEL_POSITION, leftSpacing?: number): BufferBuilder;
    printQRcode(data: string, model: number, size: number, ecLevel: number): BufferBuilder;
    printBitmap(image: number[], width: number, height: number, scale?: BITMAP_SCALE): BufferBuilder;
    printText(text: string): BufferBuilder;
    printTextLine(text: string): BufferBuilder;
    breakLine(lines?: number): BufferBuilder;
    lineFeed(): BufferBuilder;
    transmitStatus(statusType: STATUS_TYPE): BufferBuilder;
    build(): number[];
    /**
     * Register Paper Cut Action
     * @return BufferBuilder
     */
    paperCut(): BufferBuilder;
    /**
     * Register open cash drawer action
     * @return BufferBuilder
     */
    openCashDrawer(): BufferBuilder;
    printImage(image: Image, mode: RASTER_MODE): BufferBuilder;
}
export declare enum UNDERLINE_MODE {
    ONE_POINT_OF_COARSE = 49,
    TWO_POINTS_OF_COARSE = 50
}
export declare enum ALIGNMENT {
    LEFT = 48,
    CENTER = 49,
    RIGHT = 50
}
export declare enum CHARACTER_CODE_TABLE {
    PC437 = 0,
    KATAKANA = 1,
    PC850 = 2,
    PC860 = 3,
    PC863 = 4,
    PC865 = 5,
    PC866 = 17
}
export declare enum BARCODE_SYSTEM {
    UPC_A = 65,
    UPC_E = 66,
    EAN_13 = 67,
    EAN_8 = 68,
    CODE_39 = 69,
    ITF = 70,
    CODABAR = 71,
    CODE_93 = 72,
    CODE_128 = 73
}
export declare enum BARCODE_WIDTH {
    DOT_250 = 2,
    DOT_375 = 3,
    DOT_560 = 4,
    DOT_625 = 5,
    DOT_750 = 6
}
export declare enum BARCODE_LABEL_FONT {
    FONT_A = 48,
    FONT_B = 49
}
export declare enum BARCODE_LABEL_POSITION {
    NOT_PRINT = 48,
    ABOVE = 49,
    BOTTOM = 50,
    ABOVE_BOTTOM = 51
}
export declare enum QR_EC_LEVEL {
    L = 0,
    M = 1,
    Q = 2,
    H = 3
}
export declare enum BITMAP_SCALE {
    NORMAL = 48,
    DOUBLE_WIDTH = 49,
    DOUBLE_HEIGHT = 50,
    FOUR_TIMES = 51
}
export declare enum STATUS_TYPE {
    PRINTER_STATUS = 1,
    OFFLINE_STATUS = 2,
    ERROR_STATUS = 3,
    PAPER_ROLL_SENSOR_STATUS = 4
}
export declare enum RASTER_MODE {
    NORMAL = 0,
    DOUBLE_WIDTH = 1,
    DOUBLE_HEIGHT = 2,
    DOUBLE_WIDTH_HEIGHT = 3
}
