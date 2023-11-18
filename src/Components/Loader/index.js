import React from "react"
import { Spin } from 'antd';
import './styles.css';
const GlobalLoading = () => {
    return (
        <div className="loading-full_page" delay-hide="50000">
            <Spin size="large" />
        </div>)
}
export default GlobalLoading