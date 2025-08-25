import { createTheme } from "flowbite-react";

/**
 * Кастомная тема для FlowBite компонентов
 */
export const flowBiteCustomTheme = {
  button: {
    color: {
      gray: "text-gray-900 bg-white border border-gray-200 enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 :ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:enabled:hover:text-white dark:enabled:hover:bg-gray-700 focus:ring-2",
      indigo:
        "text-indigo-900 bg-white border border-indigo-300 enabled:hover:bg-indigo-100 focus:ring-4 focus:ring-indigo-300 :bg-indigo-600 dark:text-white dark:border-indigo-600 dark:enabled:hover:bg-indigo-700 dark:enabled:hover:border-indigo-700 dark:focus:ring-indigo-700",
      yellow:
        "text-yellow-900 bg-white border border-yellow-300 enabled:hover:bg-yellow-100 focus:ring-4 focus:ring-yellow-300 :bg-yellow-600 dark:text-white dark:border-yellow-600 dark:enabled:hover:bg-yellow-700 dark:enabled:hover:border-yellow-700 dark:focus:ring-yellow-700",
      green:
        "text-green-900 bg-white border border-green-300 enabled:hover:bg-green-100 focus:ring-4 focus:ring-green-300 :bg-green-600 dark:text-white dark:border-green-600 dark:enabled:hover:bg-green-700 dark:enabled:hover:border-green-700 dark:focus:ring-green-700",
      light:
        "text-gray-900 bg-white border border-gray-300 enabled:hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300 :bg-gray-600 dark:text-white dark:border-gray-600 dark:enabled:hover:bg-gray-700 dark:enabled:hover:border-gray-700 dark:focus:ring-gray-700",
      cyan: "text-cyan-900 bg-white border border-cyan-300 enabled:hover:bg-cyan-100 focus:ring-4 focus:ring-cyan-300 :bg-cyan-600 dark:text-white dark:border-cyan-600 dark:enabled:hover:bg-cyan-700 dark:enabled:hover:border-cyan-700 dark:focus:ring-cyan-700",
      lime: "text-lime-900 bg-white border border-lime-300 enabled:hover:bg-lime-100 focus:ring-4 focus:ring-lime-300 :bg-lime-600 dark:text-white dark:border-lime-600 dark:enabled:hover:bg-lime-700 dark:enabled:hover:border-lime-700 dark:focus:ring-lime-700",
      pink: "text-pink-900 bg-white border border-pink-300 enabled:hover:bg-pink-100 focus:ring-4 focus:ring-pink-300 :bg-pink-600 dark:text-white dark:border-pink-600 dark:enabled:hover:bg-pink-700 dark:enabled:hover:border-pink-700 dark:focus:ring-pink-700",
      teal: "text-teal-900 bg-white border border-teal-300 enabled:hover:bg-teal-100 focus:ring-4 focus:ring-teal-300 :bg-teal-600 dark:text-white dark:border-teal-600 dark:enabled:hover:bg-teal-700 dark:enabled:hover:border-teal-700 dark:focus:ring-teal-700",
      secondaryTransparent:
        "text-white bg-transparent focus:!ring-0 hover:bg-gradient-blue-hover hover:outline-0 max-sm:border-2 max-sm:border-primary-500 sm:outline sm:outline-2 sm:outline-primary-500 sm:-outline-offset-2",
      success:
        "text-white bg-green-700 border border-transparent enabled:hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:enabled:hover:bg-green-700 dark:focus:ring-green-800",
      dark: "text-white bg-gray-800 border border-transparent enabled:hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:enabled:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700",
      purple:
        "text-white bg-purple-700 border border-transparent enabled:hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:enabled:hover:bg-purple-700 dark:focus:ring-purple-900",
      failure:
        "text-white bg-red-700 border border-transparent enabled:hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:enabled:hover:bg-red-700 dark:focus:ring-red-900",
      info: "text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800",
      primary:
        "text-white bg-gradient-blue-500 hover:bg-gradient-blue-hover focus:!ring-0 focus:outline-none focus:border-0 focus-visible:ring-0 focus-visible:outline-none",
      warning:
        "text-white bg-yellow-400 border border-transparent enabled:hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900",
      red: "text-white bg-red-500 hover:bg-red-400 focus:!ring-0 focus:outline-none focus:border-0 focus-visible:ring-0 focus-visible:outline-none",
      secondary:
        "text-primary-500 bg-white hover:text-white hover:bg-gradient-blue-hover ring-2 ring-primary-500",
      filter:
        "ring-1 ring-primary-500 text-primary-500 focus:!border-none focus:!ring-1",
      blue: "text-cyan-900 bg-white border border-cyan-300",
    },
    gradient: {
      success:
        "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800",
      failure:
        "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800",
      purple:
        "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800",
      lime: "text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-800",
      info: "text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 ",
      teal: "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800",
      pink: "text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800",
      cyan: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
    },
    gradientDuoTone: {
      tealToLime:
        "text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 enabled:hover:bg-gradient-to-l enabled:hover:from-teal-200 enabled:hover:to-lime-200 enabled:hover:text-gray-900 focus:ring-4 focus:ring-lime-200 dark:focus:ring-teal-700",
      redToYellow:
        "text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-100 dark:focus:ring-red-400",
      purpleToPink:
        "text-white bg-gradient-to-r from-purple-500 to-pink-500 enabled:hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800",
      purpleToBlue:
        "text-white bg-gradient-to-br from-purple-600 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
      pinkToOrange:
        "text-white bg-gradient-to-br from-pink-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800",
      greenToBlue:
        "text-white bg-gradient-to-br from-green-400 to-cyan-600 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800",
      cyanToBlue:
        "text-white bg-gradient-to-r from-cyan-500 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
    },
    outline: {
      on: "flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full",
      color: {
        gray: "border border-gray-900 dark:border-white",
        default: "border-0",
        light: "",
      },
      pill: {
        on: "rounded-full",
        off: "rounded-md",
      },
      off: "",
    },
    inner: {
      isProcessingPadding: {
        lg: "pl-16",
        md: "pl-12",
        sm: "pl-10",
        xl: "pl-20",
        xs: "pl-8",
      },
      position: {
        start: "rounded-r-none",
        middle: "rounded-none",
        end: "rounded-l-none",
        none: "",
      },
      base: "flex items-stretch transition-all duration-200",
      outline: "border border-transparent",
    },
    size: {
      xs: "font-pn-regular text-sm px-4 py-3",
      md: "font-pn-bold text-base px-10 py-5",
      sm: "font-pn-bold text-base px-8 py-4",
      lg: "font-pn-bold text-lg px-16 py-6",
      custom: "",
    },
    spinnerLeftPosition: {
      lg: "left-5",
      md: "left-4",
      sm: "left-3",
      xl: "left-6",
      xs: "left-2",
    },
    base: "group flex h-min items-center duration-150 ease-in transition-bg justify-center p-0.5 text-center relative focus:z-10",
    label:
      "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-200 text-xs font-semibold text-cyan-800",
    pill: {
      off: "rounded-5xl",
      on: "rounded-full",
    },
    spinnerSlot: "absolute h-full top-0 flex items-center animate-fade-in",
    disabled: "cursor-not-allowed opacity-50",
    isProcessing: "cursor-wait",
    fullSized: "w-full",
  },
  textInput: {
    field: {
      input: {
        colors: {
          success:
            "input-success text-gray-600 disabled:cursor-text placeholder:text-gray-500 placeholder:focus:text-gray-500 focus:text-gray-600 hover:ring-green-500 hover:ring-1 hover:disabled:cursor-text bg-[#FCFCFD] focus:outline-none focus:border-none border-none ring-1 ring-green-500 focus:ring-green-500",
          failure:
            "input-failure text-gray-600 disabled:cursor-text placeholder:text-gray-500 placeholder:focus:text-gray-500 focus:text-gray-600 hover:ring-red-500 hover:ring-1 hover:disabled:cursor-text bg-[#FCFCFD] focus:outline-none focus:border-none border-none ring-1 ring-red-500 focus:ring-red-500",
          gray: "input-default text-gray-600 disabled:cursor-text placeholder:text-gray-500 placeholder:focus:text-gray-500 focus:text-gray-600 hover:ring-[#CAECFC] hover:ring-1 hover:disabled:cursor-text bg-[#FCFCFD] focus:outline-none focus:border-none border-none ring-1 ring-[#E8EBF1] focus:ring-primary-500",
          slider:
            "bg-gradient-blue-500 border-none focus:ring-0 text-white rounded-md",
        },
        sizes: {
          slider: "text-[17px] font-pn-semibold w-[55px] h-[30px] text-center",
          md: "py-[14px] px-4 font-pn-regular text-base",
          lg: "py-[19px] px-5 font-pn-regular text-base",
          sm: "py-[10px] px-3 font-pn-regular text-sm",
        },
        base: "block w-full border text-input rounded-2xl disabled:cursor-not-allowed disabled:opacity-50 shadow-input transition ease-in-out delay-50",
        withAddon: {
          on: "rounded-r-lg",
          off: "",
        },
      },
      rightIcon: {
        base: "absolute inset-y-0 cursor-text right-0 flex items-center pr-3",
        svg: "h-5 w-5 cursor-text text-gray-500",
      },
      base: "relative w-full",
    },
    addon:
      "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900",
    base: "flex rounded-2xl",
  },
  select: {
    field: {
      select: {
        colors: {
          warning:
            "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
          success:
            "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500",
          failure:
            "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
          info: "border-gray-700 bg-gray-700 text-gray-400 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500",
          gray: "border-gray-700 bg-gray-800 text-gray-600 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500",
        },
        sizes: {
          sm: "py-2 px-3 text-xs font-medium",
          lg: "sm:text-md p-4",
          md: "p-2.5 text-sm",
        },
        withAddon: {
          on: "rounded-r-lg",
          off: "rounded-lg",
        },
        withShadow: {
          on: "shadow-sm-light",
          off: "",
        },
        withIcon: {
          on: "pl-10",
          off: "",
        },
        base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
      },
      icon: {
        base: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
        svg: "h-5 w-5 text-gray-500 dark:text-gray-400",
      },
      base: "relative w-full",
    },
    addon:
      "inline-flex items-center rounded-l-md border border-r-0 px-3 text-sm border-gray-600 bg-gray-600 text-gray-400",
    base: "flex",
  },
  dropdown: {
    floating: {
      item: {
        base: "flex items-center justify-start py-2 px-4 text-sm item text-gray-700 rounded-2xl cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
        container:
          "first:[&>.item]:rounded-b-none last:[&>.item]:rounded-t-none",
        icon: "mr-2 h-4 w-4",
      },
      arrow: {
        style: {
          dark: "bg-gray-900",
          light: "bg-white",
          auto: "bg-white",
        },
        base: "absolute z-10 h-2 w-2 rotate-45",
        placement: "-4px",
      },
      style: {
        light: "border border-gray-200 bg-white text-gray-900",
        auto: "border border-gray-200 bg-white text-gray-900",
        dark: "bg-gray-900 text-white",
      },
      base: "z-10 w-fit rounded-2xl shadow-popup divide-y divide-gray-100 focus:outline-none",
      header: "block py-2 px-4 text-sm text-gray-700",
      content: "py-1 text-sm text-gray-700",
      divider: "my-1 h-px bg-gray-100",
      animation: "transition-opacity",
      hidden: "invisible opacity-0",
      target: "w-fit",
    },
    inlineWrapper: "flex items-center",
    arrowIcon: "ml-2 h-4 w-4 my-auto",
    content: "focus:outline-none",
  },
  spinner: {
    light: {
      off: {
        color: {
          success: "fill-primary-500",
          warning: "",
          failure: "",
          purple: "",
          pink: "",
          info: "",
          gray: "",
        },
        base: "",
      },
      on: {
        color: {
          warning: "",
          success: "",
          failure: "",
          purple: "",
          pink: "",
          info: "",
          gray: "",
        },
        base: "",
      },
    },
    color: {
      success: "fill-primary-500",
      warning: "fill-yellow-400",
      purple: "fill-purple-600",
      failure: "fill-red-600",
      gray: "fill-gray-600",
      info: "fill-cyan-600",
      pink: "fill-pink-600",
    },
    size: {
      xl: "w-14 h-14",
      lg: "w-8 h-8",
      md: "w-6 h-6",
      sm: "w-4 h-4",
      xs: "w-3 h-3",
    },
    base: "inline animate-spin text-white",
  },
  table: {
    body: {
      cell: {
        base: "group-body-cell py-4 pl-4 group-first/body:group-first/row:first:rounded-tl-2xl group-first/body:group-first/row:last:rounded-tr-2xl sm:group-last/body:group-last/row:first:rounded-bl-2xl group-last/body:group-last/row:last:rounded-br-2xl sm:mx-auto sm:py-4 sm:px-4",
      },
      base: "group/body divide-y",
    },
    head: {
      cell: {
        base: "group-head-cell pl-4 group-first/head:first:rounded-tl-2xl group-first/head:last:rounded-tr-2xl py-4 first:pr-1 last:pl-1 sm:py-4 sm:px-2",
      },
      base: "group/head text-white !font-pn-regular bg-gradient-blue-500",
    },
    root: {
      base: "w-full text-left text:sm sm:text-[16px] rounded-2xl font-pn-regular text-gray-600",
      wrapper: "table-wrapper relative w-full rounded-2xl",
      shadow: "absolute",
    },
    row: {
      striped: "odd:bg-gray-800 even:bg-gradient-blue-500",
      base: "group/row max-sm:mb-4 max-sm:!border-none",
      hovered: "hover:bg-gradient-blue-500",
    },
  },
  pagination: {
    pages: {
      selector: {
        base: "w-12 border py-2 h-[38px] leading-tight hover:bg-gradient-blue-500 hover:text-white text-gray-500 border-[#E8EBF1] bg-white",
        active: "bg-gradient-blue-500 text-white",
        disabled: "opacity-50 cursor-normal",
      },
      previous: {
        base: "ml-0 rounded-l-lg cursor-pointer  max-h-[38px] pointer border py-2 px-3 leading-tight border-[#E8EBF1] bg-white text-[#828FA4]",
        icon: "h-5 w-5",
      },
      next: {
        base: "rounded-r-lg cursor-pointer max-h-[38px] border pointer py-2 px-3 leading-tight border-[#E8EBF1] bg-white text-[#828FA4]",
        icon: "h-5 w-5",
      },
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      showIcon: "inline-flex",
    },
    layout: {
      table: {
        span: "font-semibold text-white",
        base: "text-sm text-gray-400",
      },
    },
    base: "",
  },
  textarea: {
    colors: {
      success:
        "input-success text-gray-600 disabled:cursor-text placeholder:text-gray-500 focus:text-gray-600 hover:ring-green-500 hover:ring-1 hover:disabled:cursor-text bg-[#FCFCFD] focus:outline-none focus:border-none border-none ring-1 ring-green-500 focus:ring-green-500",
      failure:
        "input-failure text-gray-600 disabled:cursor-text placeholder:text-gray-500 focus:text-gray-600 hover:ring-red-500 hover:ring-1 hover:disabled:cursor-text bg-[#FCFCFD] focus:outline-none focus:border-none border-none ring-1 ring-red-500 focus:ring-red-500",
      gray: "input-default text-gray-600 disabled:cursor-text placeholder:text-gray-500 focus:text-gray-600 hover:ring-[#CAECFC] hover:ring-1 hover:disabled:cursor-text bg-[#FCFCFD] focus:outline-none focus:border-none border-none ring-1 ring-[#E8EBF1] focus:ring-primary-500",
    },
    base: "resize-none rounded-2xl disabled:cursor-not-allowed disabled:opacity-50 shadow-input p-5 transition ease-in-out delay-50",
  },
  accordion: {
    title: {
      arrow: {
        open: {
          on: "rotate-180",
          off: "",
        },
        base: "h-6 w-6 shrink-0",
      },
      base: "flex bg-gray-800 ring-1 ring-gray-700 w-full items-center justify-between rounded-t-xl py-5 px-5 text-left font-medium font-md-moz-fix text-gray-400",
      open: {
        on: "bg-gray-800 rounded-b-none ring-0 border-0 text-white",
        off: "rounded-b-xl",
      },
      flush: {
        on: "bg-transparent",
        off: "",
      },
      heading: "",
    },
    root: {
      flush: {
        off: "rounded-lg border",
        on: "border",
      },
      base: "border-none flex flex-col gap-4",
    },
    content: {
      base: "py-5 px-5 bg-gray-900",
    },
  },
  tooltip: {
    arrow: {
      style: {
        auto: "bg-white dark:bg-gray-700",
        dark: "bg-gray-700",
        light: "bg-white",
      },
      base: "absolute z-10 h-2 w-2 rotate-45",
      placement: "-4px",
    },
    style: {
      auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
      light: "border border-gray-200 bg-white text-gray-900",
      dark: "text-white bg-gray-700",
    },
    base: "absolute inline-block z-10 rounded-lg -translate-y-5 py-[10px] px-3 normal-case text-xs font-normal",
    animation: "transition-opacity",
    hidden: "invisible opacity-0",
    content: "relative z-20",
    target: "w-full",
  },
  progress: {
    color: {
      primary: "bg-gradient-blue-500",
      indigo: "bg-indigo-500",
      purple: "bg-purple-500",
      yellow: "bg-yellow-500",
      green: "bg-green-400",
      blue: "bg-cyan-600",
      dark: "bg-gray-300",
      red: "bg-red-500",
    },
    size: {
      md: "h-[8px]",
      sm: "h-1.5",
      lg: "h-4",
      xl: "h-6",
    },
    bar: "rounded-full text-center font-medium font-md-moz-fix leading-none text-cyan-100 space-x-2",
    base: "w-full overflow-hidden rounded-[6px] bg-[#FCFCFD] ring-1 ring-[#E8EBF1]",
    label: "mb-1 flex justify-between font-medium font-md-moz-fix text-white",
  },
  toggleSwitch: {
    toggle: {
      checked: {
        color: {
          primary: "",
        },
        on: "after:translate-x-[26px] after:border-white",
        off: "",
      },
      base: "toggle-bg h-[30px] w-[60px] border-[#E8EBF1] rounded-full ring-1 ring-[#E8EBF1] shadow-input",
    },
    root: {
      active: {
        off: "cursor-not-allowed opacity-50",
        on: "cursor-pointer",
      },
      base: "group relative flex items-center rounded-lg focus:outline-none",
      label: "ml-3 text-[16px] text-gray-600 font-pn-semibold",
    },
  },
  label: {
    root: {
      colors: {
        warning: "text-yellow-500 dark:text-yellow-600",
        success: "text-green-700 dark:text-green-500",
        failure: "text-red-700 dark:text-red-500",
        info: "text-cyan-500 dark:text-cyan-600",
        default: "text-gray-900 dark:text-white",
      },
      base: "text-[16px] font-pn-semibold",
      disabled: "opacity-50",
    },
  },
  helperText: {
    root: {
      base: "mt-2 text-sm text-left text-red-600",
    },
  },
};

export const customThemeTooltip = {
  style: {
    auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
    light: "border border-gray-200 bg-white text-gray-900",
    dark: "bg-gray-900 text-white dark:bg-gray-700",
  },
  arrow: {
    style: {
      dark: "bg-gray-900 dark:bg-gray-700",
      auto: "bg-white dark:bg-gray-700",
      light: "bg-white",
    },
    base: "absolute z-10 h-2 w-2 rotate-45",
    placement: "-4px",
  },
  base: "absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-sm translate-y-[-20px]",
  animation: "transition-opacity",
  hidden: "invisible opacity-0",
  content: "relative z-20",
  target: "w-fit",
};

export const customThemeTooltip2 = {
  style: {
    auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
    light: "border border-gray-200 bg-white text-gray-900",
    dark: "bg-gray-900 text-white dark:bg-gray-700",
  },
  arrow: {
    style: {
      dark: "bg-gray-900 dark:bg-gray-700",
      auto: "bg-white dark:bg-gray-700",
      light: "bg-white",
    },
    base: "absolute z-10 h-2 w-2 rotate-45",
    placement: "-4px",
  },
  base: "absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-sm max-w-[300px]",
  animation: "transition-opacity",
  hidden: "invisible opacity-0",
  content: "relative z-20",
  target: "w-full h-full",
};
