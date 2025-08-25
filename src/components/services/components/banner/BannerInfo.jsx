import { IconStreamViewersBlue } from "@icons/services/index.js";
import PropTypes from "prop-types";
import React from "react";

export const BannerInfo = ({ icon, text }) => {
    return (
        <div className="w-full items-center rounded-2xl bg-[#F0FAFF] p-[15px] text-primary-500 text-sm font-pn-regular flex gap-3">
            {icon}
            {text}
        </div>
    );
};

BannerInfo.propTypes = {
    icon: PropTypes.any,
    text: PropTypes.any,
};

BannerInfo.defaultProps = {
    icon: <IconStreamViewersBlue />,
};
