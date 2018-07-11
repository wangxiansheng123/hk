/*
*  bannner组件 
* */

import React, {Component} from 'react';
import 'bannerCss';

export class Banner extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {banner} = this.props;
        return (
            <banner>
                <div>
                    <div className="banner">
                        <img src={require('../../images/banner_02.png')}/>
                    </div>
                    <div className="title">
                        <div className="title-l">
                            {banner.title !== '' ?
                                <h2 style={banner.center ? {textAlign: 'center'} : null}>{this.props.activeTitle}</h2> : null}
                            <span>{banner.number}</span>
                        </div>
                        {/*{banner.title ? <div className="title-r">*/}
                        {/*<img src={require('../../images/active/share_05.png')}/>*/}
                        {/*</div> : null*/}
                        {/*}*/}
                    </div>
                    {banner.article !== '' ? <div className="text">{this.props.description}</div> : null}
                </div>
            </banner>
        )
    }

}
