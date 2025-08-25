import { ImgRefillPaymentRobokassa } from "@apppages/profile/pages/deposit/components/refill/assets/images/index.js";

import {
  IconRefillPaymentCryptomus,
  IconRefillPaymentLolzteam,
  IconRefillPaymentLitecoin,
  IconRefillPaymentEthereum,
  IconRefillPaymentTrontrx,
  IconRefillPaymentTinkoff,
  IconRefillPaymentSberPay,
  IconRefillPaymentBitcoin,
  IconRefillPaymentUmoney,
  IconRefillPaymentUkassa,
  IconRefillPaymentCard,
  IconRefillPaymentErc,
} from "../assets/icons";

/**
 * Данные для рендера выбора платежной системы
 */
export const dataRefillPayments = [
  {
    icon: <IconRefillPaymentCard className="w-6 h-6" />,
    text: "РФ Карта",
    name: "card",
  },
  {
    icon: (
      <img
        className="w-6 h-6 rounded-full"
        src={ImgRefillPaymentRobokassa}
        alt="robokassa"
      />
    ),
    text: "НЕ РФ Карты",
    name: "robokassa",
  },
  // {
  //     icon: <img src={ImgRefillPaymentСloudpayments} className="w-6 h-6 rounded-full" alt="cloudpayments" />,
  //     text: "Cloudpayments",
  //     name: "cloudpayments",
  // },
  {
    icon: <IconRefillPaymentTinkoff />,
    text: "Tinkoff Pay",
    name: "tinkoff_pay",
  },
  {
    icon: <IconRefillPaymentSberPay />,
    text: "SberPay",
    name: "sberpay",
  },
  {
    icon: <IconRefillPaymentUkassa />,
    name: "yookassa",
    text: "Yookassa",
  },
  {
    icon: <IconRefillPaymentCryptomus />,
    name: "cryptomus",
    text: "Cryptomus",
  },
  {
    icon: <IconRefillPaymentErc />,
    text: "USDT",
    name: "usdt",
  },
  {
    icon: <IconRefillPaymentBitcoin />,
    name: "bitcoin",
    text: "Bitcoin",
  },
  {
    icon: <IconRefillPaymentEthereum />,
    name: "ethereum",
    text: "Ethereum",
  },
  {
    icon: <IconRefillPaymentLolzteam />,
    text: "LolzTeam",
    name: "lolz",
  },
  {
    icon: <IconRefillPaymentLitecoin />,
    name: "litecoin",
    text: "Litecoin",
  },
  {
    icon: <IconRefillPaymentTrontrx />,
    text: "Tron TRX",
    name: "trx",
  },
  {
    icon: <IconRefillPaymentUmoney />,
    name: "yoomoney",
    text: "ЮMoney",
  },
  // {
  //     icon: <IconRefillPaymentEthereum />,
  //     name: "ethereum",
  //     text: "Ethereum",
  // },
  // {
  //     icon: <IconRefillPaymentAdvcash />,
  //     name: "advcash",
  //     text: "AdvCash",
  // },
  // {
  //     icon: <IconRefillPaymentBitcoincash />,
  //     text: "Bitcoin Cash",
  //     name: "bitcoin_cash",
  // },
  // {
  //     icon: <IconRefillPaymentDash />,
  //     name: "dash",
  //     text: "Dash",
  // },
  // {
  //     icon: <IconRefillPaymentErc />,
  //     text: "USDT (ERC-20)",
  //     name: "erc20",
  // },
  // {
  //     icon: <IconRefillPaymentTrc />,
  //     text: "USDT (TRC-20)",
  //     name: "trc20",
  // },
  // {
  //     icon: <IconRefillPaymentZcash />,
  //     name: "zcash",
  //     text: "Zcash",
  // },
  // {
  //     icon: <IconRefillPaymentPm />,
  //     text: "Perfect Money",
  //     name: "perfectmoney",
  // },
  // {
  //     icon: <IconRefillPaymentAnypay />,
  //     name: "anypay",
  //     text: "Anypay",
  // },
  // {
  //     icon: <IconRefillPaymentBeeline />,
  //     name: "beeline",
  //     text: "Beeline",
  // },
  // {
  //     icon: <IconRefillPaymentTele />,
  //     name: "tele2",
  //     text: "Tele2",
  // },
  // {
  //     icon: <IconRefillPaymentMegafon />,
  //     name: "megafon",
  //     text: "Megafon",
  // },
  // {
  //     icon: <IconRefillPaymentMts />,
  //     name: "mts",
  //     text: "MTS",
  // },
];
