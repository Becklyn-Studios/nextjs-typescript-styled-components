import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from "react";
import Link, { LinkProps } from "next/link";
import styled, { css } from "styled-components";
import { text } from "@css/typography";
import { hover } from "@css/helper";

const primaryWrapper = css`
    background-color: ${p => p.theme.colors.gray900};
    color: ${p => p.theme.colors.gray50};

    ${p => hover`
        background-color: ${p.theme.colors.gray800};
    `};
`;

const secondaryWrapper = css`
    background-color: ${p => p.theme.colors.gray300};
    color: ${p => p.theme.colors.gray900};

    ${p => hover`
        background-color: ${p.theme.colors.gray400};
    `};
`;

const getWrapperVariant = (variant?: Variant) => {
    switch (variant) {
        case "secondary":
            return secondaryWrapper;
        default:
            return primaryWrapper;
    }
};

const ButtonWrapper = styled.button<{ $variant: Variant }>`
    min-height: 5rem;
    padding: 0.8rem 2.4rem;
    border-radius: 2.5rem;
    ${text("textMd", "semiBold")};
    ${p => getWrapperVariant(p.$variant)};
`;

type Variant = "primary" | "secondary";

interface HTMLAnchorProps
    extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
        Pick<LinkProps, "href" | "shallow"> {
    element: "a";
    variant?: Variant;
    disabled?: boolean;
}

interface HTMLButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    element?: "button";
    variant?: Variant;
}

export type ButtonProps = HTMLButtonProps | HTMLAnchorProps;

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
    variant = "primary",
    children,
    ...props
}) => {
    switch (props.element) {
        case "a": {
            const { element, href, shallow, ...rest } = props;
            return (
                <Link href={href} shallow={shallow} passHref legacyBehavior>
                    <ButtonWrapper as="a" {...rest} $variant={variant}>
                        {children}
                    </ButtonWrapper>
                </Link>
            );
        }
        default: {
            const { element, ...rest } = props;
            return (
                <ButtonWrapper {...rest} $variant={variant}>
                    {children}
                </ButtonWrapper>
            );
        }
    }
};
