export interface UmsProps {
  id: string
  name: string
  description: string
}

export const umsColumns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
          title: 'Action',
          key: 'operation',
          dataIndex: 'action'
        }
      ]