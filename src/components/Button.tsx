import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const variant = props.variant ?? "primary";
  const className = props.className ?? "";
  const classes = `${styles.button} ${styles[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={classes}
        target={props.target}
        rel={props.rel}
      >
        {props.children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  const {
    children,
    variant: _variant,
    className: _className,
    ...rest
  } = buttonProps;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
