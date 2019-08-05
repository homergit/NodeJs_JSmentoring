import React, { PureComponent } from 'react';
import {getGroups} from '../../api';
import GroupItem from '../../components/GroupItem'

export default class Groups extends PureComponent  {

    constructor(props) {
        super(props);

        this.state = {
            groups: []
        }
    }

    componentDidMount() {
        this.loadGroups();
    }

    loadGroups = async () => {
        this.setState({
            groups: await getGroups()
        });
    };

    render() {
        const {groups} = this.state;

        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/#">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Groups</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-3 offset-9">
                        <a href="#/groups/add" className="btn btn-primary float-right">Add group</a>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    groups.map((group, id) => {
                                        return (<GroupItem group={group} index={id+1} key={group.id} onUpdate={this.loadGroups}/>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
