import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        speed={3}
        width={502}
        height={184}
        viewBox="0 0 502 184"
        backgroundColor="#a8d1f0"
        foregroundColor="#decece"
        {...props}
    >
        <rect x="13" y="35" rx="0" ry="0" width="157" height="20" />
        <rect x="13" y="80" rx="0" ry="0" width="148" height="20" />
        <rect x="13" y="109" rx="0" ry="0" width="107" height="15" />
        <rect x="13" y="140" rx="0" ry="0" width="141" height="15" />
        <rect x="13" y="165" rx="0" ry="0" width="109" height="15" />
        <rect x="335" y="80" rx="0" ry="0" width="148" height="15" />
        <rect x="335" y="109" rx="0" ry="0" width="107" height="15" />
        <rect x="335" y="140" rx="0" ry="0" width="141" height="15" />
        <rect x="334" y="165" rx="0" ry="0" width="109" height="15" />
        <rect x="335" y="35" rx="0" ry="0" width="157" height="20" />
    </ContentLoader>
)

export default MyLoader
