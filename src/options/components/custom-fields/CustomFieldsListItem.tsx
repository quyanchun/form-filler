import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { GetMessage } from 'src/common/helpers';
import AddFieldButton from 'src/options/components/custom-fields/AddFieldButton';

function isNotEmpty(item: string | number | undefined | null): boolean {
  return item !== undefined && item !== null;
}

interface IOwnProps {
  customField: ICustomField;
  itemIndex: number;
  onAdd: CustomFieldAddFunction;
  onEdit: CustomFieldEditFunction;
  onDelete: CustomFieldDeleteFunction;
}

class CustomFieldsListItem extends React.PureComponent<IOwnProps> {
  constructor(props: IOwnProps) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  private handleEdit(): void {
    this.props.onEdit(this.props.customField, this.props.itemIndex);
  }

  private handleDelete(): void {
    this.props.onDelete(this.props.itemIndex);
  }

  public render(): JSX.Element {
    const customField = this.props.customField;

    return (
      <Draggable draggableId={`draggable-${this.props.itemIndex}`} index={this.props.itemIndex}>
        {provided => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <div className="card custom-field">
              <div className="card-header">
                <strong>{customField.name}</strong>
                <div className="custom-field-buttons">
                  <div className="custom-field-button drag-handle" {...provided.dragHandleProps}>
                    <img src="images/move.svg" width="16" height="16" />
                  </div>
                  <div className="custom-field-button" onClick={this.handleEdit}>
                    <img src="images/edit.svg" width="16" height="16" />
                  </div>
                  <div className="custom-field-button" onClick={this.handleDelete}>
                    <img src="images/delete.svg" width="16" height="16" />
                  </div>
                </div>
              </div>
              <table className="table">
                <tbody>
                  <tr>
                    <td className="col-3">{GetMessage('customFields_label_dataType')}</td>
                    <td>{customField.type}</td>
                  </tr>
                  <tr>
                    <td>{GetMessage('customFields_label_match')}</td>
                    <td>{customField.match.join(', ')}</td>
                  </tr>
                  {customField.template && (
                    <tr>
                      <td>{GetMessage('customFields_label_template')}</td>
                      <td>{customField.template}</td>
                    </tr>
                  )}
                  {isNotEmpty(customField.min) && (
                    <tr>
                      <td>{GetMessage('customFields_label_minValue')}</td>
                      <td>{customField.min}</td>
                    </tr>
                  )}
                  {isNotEmpty(customField.max) && (
                    <tr>
                      <td>{GetMessage('customFields_label_maxValue')}</td>
                      <td>{customField.max}</td>
                    </tr>
                  )}
                  {isNotEmpty(customField.maxLength) && (
                    <tr>
                      <td>{GetMessage('customFields_label_maxLength')}</td>
                      <td>{customField.maxLength}</td>
                    </tr>
                  )}
                  {customField.list && (
                    <tr>
                      <td>{GetMessage('customFields_label_listItems')}</td>
                      <td>{customField.list.join(', ')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <AddFieldButton index={this.props.itemIndex + 1} onClick={this.props.onAdd} />
          </div>
        )}
      </Draggable>
    );
  }
}

export default CustomFieldsListItem;
