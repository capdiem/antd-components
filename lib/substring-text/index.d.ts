import React from "react";
export interface SubstringTextComponentProps {
    text: string;
    width: number;
    row?: number;
    separator?: string;
}
declare const SubstringText: React.FC<SubstringTextComponentProps>;
export default SubstringText;
