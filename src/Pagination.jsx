import React, {Component} from "react";
import PropTypes from 'prop-types';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {},
            paginationData: {},
            nextPageUrl: null,
            prevPageUrl: null,
            currentPage: null
        };
    }

    componentDidMount() {
        this.getProps(this.props);
    }

    UNSAFE_componentWillReceiveProps(props, nextContext) {
        this.getProps(props);
    }

    // Transform props
    getProps = (props) => {
        let defaultProps = Pagination.defaultProps.options;
        let options = this.props.options;
        Object.keys(defaultProps).forEach(function (key) {
            options[key] = props[key] ? props[key] : props['options'][key] ? props['options'][key] : defaultProps[key];
        });
        this.setState({options: options, paginationData: props.data});
    };

    // Check if page is active
    isCurrent = (page) => {
        let currentPage = this.state.paginationData.meta ? this.state.paginationData.meta.current_page : this.state.paginationData.current_page;
        return currentPage === page;
    };

    // Handle pagination buttons click event
    handleClick = (page) => {
        let parameters = {};
        if (this.props.requestParams) {
            parameters = this.props.requestParams;
        }
        parameters.page = page;
        this.props.changePage(parameters);
    };

    // Generate Prev Icon Or Text Buttons
    generateButtonsPrev = () => {
        let options = this.state.options;
        return options.prevButtonText;
    };

    // Generate Next Icon Or Text Buttons
    generateButtonsNext = () => {
        let options = this.state.options;
        return options.nextButtonText;
    };

    // Generate pagination buttons
    generatePagination = () => {
        let paginationData = this.state.paginationData;
        let pagination;
        if (Object.keys(paginationData).length) {
            let options = this.state.options;

            let nextPageUrl = paginationData.hasOwnProperty('next_page_url') ? paginationData.next_page_url : paginationData.links.next;
            let prevPageUrl = paginationData.hasOwnProperty('prev_page_url') ? paginationData.prev_page_url : paginationData.links.prev;
            pagination = (
                <div className={options.containerClass}>
                    {prevPageUrl ?
                        <span>
                            <a href="" className={options.numberClass}>
                                {this.generateButtonsPrev()}
                            </a>
                        </span> : ""}
                    {nextPageUrl ?
                        <span>
                            <a href="" className={options.numberClass}>
                                {this.generateButtonsNext()}
                            </a>
                        </span>
                        : ""}
                </div>
            );
        }
        return pagination;
    };

    render() {
        return (
            <React.Fragment>
                {this.generatePagination()}
            </React.Fragment>
        );
    }
}

Pagination.defaultProps = {
    options: {
        containerClass: "pagination",
        prevButtonClass: "link",
        prevButtonText: "« newer",
        nextButtonClass: "link",
        nextButtonText: "older »",
        numberClass: false,
        numbersCountForShow: 2,
        activeClass: 'active'
    },
    data: {}
};

Pagination.propTypes = {
    options: PropTypes.shape({
        containerClass: PropTypes.string,
        nextButtonClass: PropTypes.string,
        nextButtonText: PropTypes.string,
        prevButtonClass: PropTypes.string,
        prevButtonText: PropTypes.string,
        numberClass: PropTypes.string,
        numberCountForShow: PropTypes.number,
        activeClass: PropTypes.string
    }),
    data: PropTypes.object
};
export default Pagination;
