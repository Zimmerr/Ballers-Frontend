import { Table, Transfer } from "antd";
import type { TableColumnsType, TableProps, TransferProps } from "antd";
import difference from "lodash/difference";
import { JogadorTransfer } from "../../../../../interfaces/jogador.interface";

type TableRowSelection<T extends object> = TableProps<T>["rowSelection"];

interface TableTransferProps extends TransferProps<JogadorTransfer> {
  dataSource: JogadorTransfer[];
  leftColumns: TableColumnsType<JogadorTransfer>;
  rightColumns: TableColumnsType<JogadorTransfer>;
}

// Customize Table Transfer
const TransferJogador = ({
  leftColumns,
  rightColumns,
  ...restProps
}: TableTransferProps) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;

      const rowSelection: TableRowSelection<JogadorTransfer> = {
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows.map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys as string[], selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key as string, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? "none" : undefined }}
          onRow={({ key }) => ({
            onClick: () => {
              onItemSelect(
                key as string,
                !listSelectedKeys.includes(key as string),
              );
            },
          })}
        />
      );
    }}
  </Transfer>
);

export default TransferJogador;
