import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

export interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    subtitle?: React.ReactNode;
    avatar?: React.ReactNode;
    avatarSize?: number;
}

const DEFAULT_SIZE = 40;

export default function CardTitle(props: CardTitleProps) {
    const {
        subtitle,
        avatar,
        children,
        className,
        avatarSize = DEFAULT_SIZE,
        ...otherProps
    } = props;
    let _avatar = avatar;

    if (React.isValidElement(avatar)) {
        _avatar = React.cloneElement(avatar, { className: "w-100 h-100" });
    }

    return (
        <div className={
            classNames(
                className,
                "d-flex",
                "mb-2"
            )
        } {...otherProps}>
            {
                avatar && (
                    <div
                        className="rounded-circle mr-2 flex-shrink-0"
                        style={{ width: avatarSize, height: avatarSize }}>
                        {_avatar}
                    </div>
                )
            }
            <div>
                <div className="card-title">{children}</div>
                {
                    subtitle && (
                        <div className="card-subtitle text-muted">{subtitle}</div>
                    )
                }
            </div>
        </div>
    );
}

CardTitle.propTypes = {
    subtitle: PropTypes.node,
    avatar: PropTypes.node,
    avatarSize: PropTypes.number
};
CardTitle.defaultProps = {
    avatarSize: DEFAULT_SIZE
};