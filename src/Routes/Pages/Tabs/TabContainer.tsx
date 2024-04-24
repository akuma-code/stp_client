import React, { PropsWithChildren } from 'react'
import { routePaths } from '../../routePath';
import { useRouteMatch } from '../../../Hooks/useRouteMatch';
import { TabRouterPanel } from './TabRouterPanel';
import { StpDataTable } from '../../../Components/StpTableView/StpDataTable';
import { useIdSelector } from '../../../Hooks/useIdSelector';
import { useLoadAllData } from '../../../Hooks/useLoadAllData';

type Props = PropsWithChildren

const TabContainer = ({ children }: Props) => {
    const [selected, select] = useIdSelector()
    const queryAll = useLoadAllData()



    return (
        <TabRouterPanel path={ routePaths.table } value='table'>
            { queryAll.isSuccess &&
                <StpDataTable
                    items={ queryAll.data }
                    selectedItems={ selected }
                    selectorActions={ select }
                />
            }
        </TabRouterPanel>
    )
}

export default TabContainer