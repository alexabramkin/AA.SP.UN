import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import * as strings from 'mystrings';
import AaSpFileUnlock, { IAaSpFileUnlockProps } from './components/AaSpFileUnlock';
import { IAaSpFileUnlockWebPartProps } from './IAaSpFileUnlockWebPartProps';

export default class AaSpFileUnlockWebPart extends BaseClientSideWebPart<IAaSpFileUnlockWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<IAaSpFileUnlockProps> = React.createElement(AaSpFileUnlock, {
      description: this.properties.description
    });

    ReactDom.render(element, this.domElement);
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
