import {
    IconPaymentColorPerfectMoney,
    IconPaymentColorBitcoincash,
    IconPaymentColorLitecoin,
    IconPaymentColorEthereum,
    IconPaymentColorMegafon,
    IconPaymentColorBitcoin,
    IconPaymentColorBeeline,
    IconPaymentColorAdvcash,
    IconPaymentColorTele,
    IconPaymentYookassa,
    IconPaymentColorTrc,
    IconPaymentColorMts,
    IconPaymentColorErc,
    IconPaymentTronTrx,
    IconPaymentQiwi,
    IconPaymentLolz,
    IconPaymentCard,
} from "@icons";
import { FaGooglePay, FaApple } from "react-icons/fa";
import { SiWebmoney } from "react-icons/si";
import { IoLogoUsd } from "react-icons/io";
import { IoCard } from "react-icons/io5";

/**
 * Конфигурация иконок оплаты
 */
export const configHistoryPayments = {
    yoo_money: {
        icon: <IconPaymentYookassa classname="fill-[#8B3FFD]" />,
        name: "Yoomoney",
    },

    bank_card: {
        icon: <IoCard className="fill-primary-500 w-5 h-5" />,
        name: "Bank card",
    },

    "qiwi form": {
        icon: <IconPaymentQiwi className="fill-[#FF8C00]" />,
        name: "QIWI",
    },

    "qiwi p2p": {
        icon: <IconPaymentQiwi className="fill-[#FF8C00]" />,
        name: "QIWI",
    },

    ym: {
        icon: <IconPaymentYookassa classname="fill-[#8B3FFD]" />,
        name: "Yoomoney",
    },

    card: {
        icon: <IoCard className="fill-primary-500 w-5 h-5" />,
        name: "Card",
    },
    google_pay: {
        icon: <FaGooglePay className="h-5 w-5" />,
        name: "Google pay",
    },
    trx: {
        icon: <IconPaymentTronTrx classname="fill-[#FF060A]" />,
        name: "TRX",
    },
    bitcoincash: {
        icon: <IconPaymentColorBitcoincash />,
        name: "Bitcoin Cash",
    },
    googlepay: {
        icon: <FaGooglePay className="h-5 w-5" />,
        name: "Google pay",
    },

    lolz: {
        icon: <IconPaymentLolz className="fill-[#23A86D]" />,
        name: "Lolz",
    },
    qiwi: {
        icon: <IconPaymentQiwi className="fill-[#FF8C00]" />,
        name: "QIWI",
    },
    cd: {
        icon: <IconPaymentCard className="fill-purple-600" />,
        name: "Card",
    },
    qw: {
        icon: <IconPaymentQiwi className="fill-[#FF8C00]" />,
        name: "QIWI",
    },

    webmoney: {
        icon: <SiWebmoney className="h-5 w-5" />,
        name: "Webmoney",
    },
    apple_pay: {
        icon: <FaApple className="h-5 w-5" />,
        name: "Apple pay",
    },

    applepay: {
        icon: <FaApple className="h-5 w-5" />,
        name: "Apple pay",
    },
    bitcoin_test: {
        icon: <IconPaymentColorBitcoin />,
        name: "Bitcoin",
    },
    btc: {
        icon: <IconPaymentColorBitcoincash />,
        name: "Bitcoin Cash",
    },

    ethereum: {
        icon: <IconPaymentColorEthereum />,
        name: "Ethereum",
    },
    litecoin: {
        icon: <IconPaymentColorLitecoin />,
        name: "Litecoin",
    },
    advcash: {
        icon: <IconPaymentColorAdvcash />,
        name: "Advcash",
    },

    beeline: {
        icon: <IconPaymentColorBeeline />,
        name: "Beeline",
    },

    bitcoin: {
        icon: <IconPaymentColorBitcoin />,
        name: "Bitcoin",
    },
    megafon: {
        icon: <IconPaymentColorMegafon />,
        name: "Megafon",
    },
    usdt: {
        icon: <IoLogoUsd className="h-5 w-5" />,
        name: "Usdt",
    },

    eth: {
        icon: <IconPaymentColorEthereum />,
        name: "Ethereum",
    },
    ltc: {
        icon: <IconPaymentColorLitecoin />,
        name: "Litecoin",
    },

    et: {
        icon: <IconPaymentColorEthereum />,
        name: "Ethereum",
    },
    lc: {
        icon: <IconPaymentColorLitecoin />,
        name: "Litecoin",
    },
    bt: {
        icon: <IconPaymentColorBitcoin />,
        name: "Bitcoin",
    },

    pm: {
        icon: <IconPaymentColorPerfectMoney />,
        name: "PM",
    },

    erc20: {
        icon: <IconPaymentColorErc />,
        name: "Erc-20",
    },

    tele2: {
        icon: <IconPaymentColorTele />,
        name: "Tele2",
    },

    trc20: {
        icon: <IconPaymentColorTrc />,
        name: "Trc-20",
    },

    mts: {
        icon: <IconPaymentColorMts />,
        name: "MTS",
    },

    tinkoff_bank: {
        name: "Tinkoff",
        icon: null,
    },

    dogecoin: {
        name: "Doge coin",
        icon: null,
    },

    alfabank: {
        name: "Alfabank",
        icon: null,
    },

    polygon: {
        name: "Polygon",
        icon: null,
    },

    doge: {
        name: "Doge coin",
        icon: null,
    },

    sberbank: {
        name: "Sber",
        icon: null,
    },

    ds: {
        name: "Doge coin",
        icon: null,
    },

    term: {
        name: "Term",
        icon: null,
    },

    bch: {
        name: "Bch",
        icon: null,
    },

    sbp: {
        name: "СБП",
        icon: null,
    },

    ton: {
        name: "Ton",
        icon: null,
    },
    ya: {
        icon: null,
        name: "Ya",
    },
};
