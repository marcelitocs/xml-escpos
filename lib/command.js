"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
}
exports.Command = Command;
Command.ESC = 0x1B;
Command.FF = 0x0C;
Command.FS = 0x1C;
Command.GS = 0x1D;
Command.DC1 = 0x11;
Command.DC4 = 0x14;
Command.DLE = 0x10;
Command.NL = 0x0A;
Command.SP = 0x20;
Command.US = 0x1F;
Command.DLE_EOT = (n) => [Command.DLE, 0x04, n]; // DLEEOTn
Command.ESC_init = [Command.ESC, 0x40]; //ESC@
Command.ESC_exclamation = (n) => [Command.ESC, 0x21, n]; // ESC!n
Command.ESC_minus = (n) => [Command.ESC, 0x2D, n]; // ESC-n
Command.ESC_rev = (n) => [Command.ESC, 0x7B, n]; // ESC{n
Command.ESC_a = (n) => [Command.ESC, 0x61, n]; // ESCan
Command.ESC_d = (n) => [Command.ESC, 0x64, n]; // ESCdn
Command.ESC_E = (n) => [Command.ESC, 0x45, n]; // ESCEn
Command.ESC_G = (n) => [Command.ESC, 0x47, n]; // ESCGn
Command.ESC_J = (n) => [Command.ESC, 0x4A, n]; // ESCJn
Command.ESC_M = (n) => [Command.ESC, 0x4D, n]; // ESCMn
Command.ESC_t = (n) => [Command.ESC, 0x74, n]; // ESCtn
Command.ESC_Z = (m, n, k) => [Command.ESC, 0x5A, m, n, k]; // ESCZmnk
Command.FS_and = [Command.FS, 0x40]; //ESC@
Command.FS_ob_C_fe_utf = [Command.FS, 0x28, 0x43, 0x02, 0x00, 0x30, 0x02]; //UTF-8 encoding
Command.GS_exclamation = (n) => [Command.GS, 0x21, n]; // ESC!n
Command.GS_B = (n) => [Command.GS, 0x42, n]; // GSBn
Command.GS_f = (n) => [Command.GS, 0x66, n]; // GSfn
Command.GS_h = (n) => [Command.GS, 0x68, n]; // GShn
Command.GS_H = (n) => [Command.GS, 0x48, n]; // GSHn
Command.GS_K = (m, n) => [Command.GS, 0x6B, m, n]; // GSKmn
Command.GS_v0 = (m) => [Command.GS, 0x76, 0x30, m]; // GSv0m
Command.GS_w = (n) => [Command.GS, 0x77, n]; // GSwn
Command.GS_x = (n) => [Command.GS, 0x78, n]; // GSxn
Command.GS_v = (m, n) => [Command.GS, 0x56, m, n]; // GSv
Command.ESC_ak = (n) => [Command.ESC, 0x2A, n]; // ESC*n
Command.ESC_akp = (m, nL, nH) => [Command.ESC, 0x2A, m, nL, nH]; // ESC*n
Command.LF = [Command.NL];
// Cash Drawer
Command.CD_KICK_1 = () => [Command.ESC, 0x70, 0x00]; // Sends a pulse to pin 2
Command.CD_KICK_2 = () => [Command.ESC, 0x70, 0x01]; // Sends a pulse to pin 5
//QR Code
Command.QR_MODEL = (n) => [29, 40, 107, 4, 0, 49, 65, n, 0]; //Select QR model, n = 49/50
//[29 40 107 4 0 49 65 n1 n2]
Command.QR_SIZE = (n) => [29, 40, 107, 3, 0, 49, 67, n]; //Set QR size, n = 8?
//[29 40 107 3 0 49 67 n]
Command.EC_LEVEL = (n) => [29, 40, 107, 3, 0, 49, 69, n]; //Set error correction level for QR, n = 48/49/50/51
//[29 40 107 3 0 49 69 n]
Command.STORE_QR = (pL, pH) => [29, 40, 107, pL, pH, 49, 80, 48]; //Store QR data in symbol storage area
//[29 40 107 pL pH 49 80 48 d1…dk]
Command.PRINT_QR = () => [29, 40, 107, 3, 0, 49, 81, 48]; //Print QR from data in symbol storage area
