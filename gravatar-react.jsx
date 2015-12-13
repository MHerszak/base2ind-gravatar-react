
Gravatar = React.createClass({
    displayName: 'Gravatar',
    propTypes: {
        email: React.PropTypes.string,
        md5: React.PropTypes.string,
        size: React.PropTypes.number,
        rating: React.PropTypes.string,
        https: React.PropTypes.bool,
        "default": React.PropTypes.string,
        className: React.PropTypes.string
    },
    getDefaultProps:function() {
        return {
            size: 50,
            rating: 'g',
            https: false,
            "default": "retro",
            className: ""
        };
    },
    render:function() {
        var base, hash, modernBrowser, query, retinaQuery, retinaSrc, src;
        base = this.props.https ? "https://secure.gravatar.com/avatar/" : 'http://www.gravatar.com/avatar/';
        query = querystring.stringify({
            s: this.props.size,
            r: this.props.rating,
            d: this.props["default"]
        });
        retinaQuery = querystring.stringify({
            s: this.props.size * 2,
            r: this.props.rating,
            d: this.props["default"]
        });
        if (this.props.md5) {
            hash = this.props.md5;
        } else if (this.props.email) {
            hash = CryptoJS.MD5(this.props.email);
        } else {
            console.warn('Gravatar image can not be fetched. Either the "email" or "md5" prop must be specified.');
            return (<div>
                <script/>
            </div>);
        }
        src = base + hash + "?" + query;
        retinaSrc = base + hash + "?" + retinaQuery;
        modernBrowser = true;
        if (typeof window !== "undefined" && window !== null) {
            modernBrowser = 'srcset' in document.createElement('img');
        }
        if (!modernBrowser && isRetina()) {
            return (<img style={this.props.style} className={"react-gravatar " + this.props.className} src={retinaSrc} height={this.props.size} width={this.props.size} />);
        } else {
            return (<img style={this.props.style} className={"react-gravatar " + this.props.className} src={src} srcSet={retinaSrc + " 2x"} height={this.props.size} width={this.props.size} />);
        }
    }
});