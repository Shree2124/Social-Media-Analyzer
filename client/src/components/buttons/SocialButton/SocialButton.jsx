import PropTypes from 'prop-types';

const SocialButton = ({ icon, label, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        style={{
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.65rem',
            borderRadius: '50%',
            border: '1px solid #cbd5f5',
            background: '#ffffff',
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#0f172a',
            cursor: 'pointer',
            transition: 'background 0.2s ease-in-out, border 0.2s ease-in-out',
        }}
    >
        <span style={{ display: 'inline-flex', fontSize: '1.2rem' }}>{icon}</span>
        {/* <span style={{ flex: 1, textAlign: 'center' }}>{label}</span> */}
    </button>
);

SocialButton.propTypes = {
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

SocialButton.defaultProps = {
    onClick: () => {},
};

export default SocialButton;

