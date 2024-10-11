import PropTypes from "prop-types"

const Container = ({ children }) => {
    return (
        <div className="mx-auto container px-8 py-5">
            {children}
        </div>
    )
}
Container.propTypes = {
    children: PropTypes.node.isRequired,
    render: function () {
        return <div>Hello {this.props.children}</div>;

    }
}

export default Container