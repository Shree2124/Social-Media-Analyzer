import PropTypes from 'prop-types';

const Button = ({ children, type = 'button', variant = 'primary', ...rest }) => {
    const variants = {
        primary: {
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: '1px solid #2563eb',
        },
        secondary: {
            backgroundColor: '#ffffff',
            color: '#2563eb',
            border: '1px solid #2563eb',
        },
    };

    return (
        <button
            type={type}
            style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                ...variants[variant],
            }}
            {...rest}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['primary', 'secondary']),
};

export default Button;

