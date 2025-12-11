import { LineWave } from 'react-loader-spinner'
export default function Loader(){
    return (
        <LineWave
visible={true}
height="100"
width="100"
color="#fff"
ariaLabel="line-wave-loading"
wrapperStyle={{}}
wrapperClass=""
firstLineColor=""
middleLineColor=""
lastLineColor=""
/>
    )
}