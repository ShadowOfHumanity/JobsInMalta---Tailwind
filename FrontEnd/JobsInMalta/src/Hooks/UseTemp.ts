import useData from './UseData'

export interface TempData {
    tempData: string;
}

const useTemp = () => {
    return useData<TempData>('/temp')
}

export default useTemp