import { useEffect, useMemo, useRef, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_SortingState,
    type MRT_RowVirtualizer,
} from 'material-react-table';

import { useLoadAllData } from '../useLoadAllData';
import { StpData } from '../../Components/StpTableView/StpDataTable';
import { useMRTData } from './useMRTData';

const Example = () => {
    const query = useLoadAllData()
    const { columns } = useMRTData()

    //optionally access the underlying virtualizer instance
    const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

    const [data, setData] = useState<StpData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sorting, setSorting] = useState<MRT_SortingState>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (query.isSuccess) setData(query.data);
            setIsLoading(false);
        }
    }, [query.data, query.isSuccess]);

    useEffect(() => {
        //scroll to the top of the table when the sorting changes
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting]);

    const table = useMaterialReactTable({
        columns,
        data, //10,000 rows
        enableBottomToolbar: false,
        enableGlobalFilterModes: true,
        enablePagination: false,
        enableRowNumbers: true,
        enableRowVirtualization: true,
        muiTableContainerProps: { sx: { maxHeight: '750px' } },
        onSortingChange: setSorting,
        state: { isLoading, sorting },
        rowVirtualizerInstanceRef, //optional
        rowVirtualizerOptions: { overscan: 5 }, //optionally customize the row virtualizer
    });

    return <MaterialReactTable table={ table } />;
};

export default Example;