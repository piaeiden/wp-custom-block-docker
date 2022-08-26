( function(blocks, editor, components, i18n, element) {
 
    var dropRight = lodash.dropRight;
    var times = lodash.times;
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var InnerBlocks = wp.blockEditor.InnerBlocks;
    var __ = wp.i18n.__;
    var PanelBody = wp.components.PanelBody;
    var RangeControl = wp.components.RangeControl;
    var Notice = wp.components.Notice; 
    var InspectorControls = wp.blockEditor.InspectorControls;
    var useInnerBlocksProps = wp.blockEditor.__experimentalUseInnerBlocksProps;
    var __experimentalBlockVariationPicker = wp.blockEditor.__experimentalBlockVariationPicker;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var blockEditStore = wp.blockEditor.store;
    var withDispatch = wp.data.withDispatch;
    var MenuGroup = wp.components.MenuGroup;
    var MenuItemsChoice = wp.components.MenuItemsChoice;
    var TextControl = wp.components.TextControl;
    var CheckboxControl = wp.components.CheckboxControl;
  
    // They are used to dispatch props to registries. For example telling Gutenberg to update a post meta via ‘core/editor‘.
    var useDispatch = wp.data.useDispatch;
  
    //Function useSelect() is used to get state-derived props from registered selectors. 
    //Common examples are accessing the ‘core‘ or ‘core/editor‘ selectors in order to perform 
    //queries for posts (getEntityRecords), access post meta (getEditedPostAttribute) or simply 
    //getting current post type or other information.
    var useSelect = wp.data.useSelect;
  
    var createBlock = wp.blocks.createBlock;
    var createBlocksFromInnerBlocksTemplate = wp.blocks.createBlocksFromInnerBlocksTemplate;
    var blocksStore = wp.blocks.store;
    var el = wp.element.createElement;
    const listElementsArray = [];
    var tryingIt;
  
    registerBlockType( 'custom-blocks/form-dropdown', {
      title: 'Form Dropdown', // The title of block in editor.
      icon: 'admin-comments', // The icon of block in editor.
      category: 'custom-blocks',
        "apiVersion": 2,
        "textdomain": "default",
        "supports": {
          "anchor": true,
          "align": [ "wide", "full" ],
          "html": false,
          "color": {
            "gradients": true,
            "link": true
          }
        },
        "editorStyle": "wp-block-columns-editor",
        "style": "wp-block-columns",
        "attributes":{
        "requiredAttribute": {
          "type": "boolean",
          "default": false
        },
        "disabledAttribute": {
          "type": "boolean",
          "default": false
        },
        
          "numberOfElements": {
            "type": "number",
            "default": 0
          },
          "clientIdAttributes": {
            "type": "string",
            "default": [] //achtung, muss auch wieder geleert werden wenn element entfernt wird, aber erstmal logik zum befüllen
          },
          "clientIdDropdown": {
            "type": "string",
            "default": ""
          },
          "listElementsArrays": {
            "default": []
          },
          "styleAttribute": {
            "type": "string",
            "default": ""
          },
          "placeholderAttribute": {
            "type": "string",
            "default": "Placeholder"
          },
        },
    
      edit: function(props) {
        //Array that holds the client id of every element (input field) from the dropdown. Used to transfer the client id to the label elements.
        const clientIdArray = [];
  
        const choicesStyleAttribute = [
          {
            value: 'is-style-input-size-third',
            label: 'Width: 33%',
        },
          {
              value: 'is-style-input-size-half',
              label: 'Width: 50%',
          },
          
        {
          value: 'is-style-input-size-two-thirds',
          label: 'Width: 66%',
      },
      {
        value: 'is-style-input-size-whole',
        label: 'Width: 100%',
        'aria-checked': true
      }
      ];
        
    
        // props.setAttributes({listElementsArray: listElementsArray});
  
        function Placeholder({
          clientId,
          name,
          setAttributes
        }) {
  
          props.setAttributes({clientIdDropdown: clientId});
          const {
            defaultVariation,
          } = (0, useSelect)(select => {
            const {
              getBlockVariations,
              getBlockType,
              getDefaultBlockVariation
            } = select(blocksStore);
            return {
              blockType: getBlockType(name),
              defaultVariation: getDefaultBlockVariation(name, 'block'),
              variations: getBlockVariations(name, 'block')
            };
          }, [name]);
          const {
            replaceInnerBlocks
          } = (0, useDispatch)(blockEditStore);
          // let numb;
         
          function addElements (number) {        
          const array = [];
          
          for (i=1; i <= number; i++) {        
            array.push(createBlock('custom-blocks/form-dropdown-element', {}));
            // listElementsArray.push(el('li', {}));
          }
          return array;
        }
            
          const blockProps = (0, useBlockProps)();
          return el("div", blockProps, el(__experimentalBlockVariationPicker, {
            variations: [{
              name: 'one-element-full',
              title: __( 'One Element' ),
              description: __( 'One Element' ),
              icon: 'format-image',
              innerBlocks: addElements(1)
              ,
              scope: [ 'inserter' ],
              // attributes: {variationElements: 1}
            }, {
              name: 'two-elements-full',
              title: __( 'Two Elements' ),
              description: __( 'Two Elements' ),
              icon: 'format-image',
              innerBlocks: addElements(2),
              scope: [ 'inserter' ],
              // attributes: {variationElements: 2}
            },
            {
              name: 'three-elements-full',
              title: __( 'Three Elements' ),
              description: __( 'Three Elements' ),
              icon: 'format-image',
              innerBlocks: [createBlock('custom-blocks/form-dropdown-element', {}), 
              createBlock('custom-blocks/form-dropdown-element', {}),
              createBlock('custom-blocks/form-dropdown-element', {})],
              scope: [ 'inserter' ],
              // attributes: {variationElements: 3}
            },
            {
              name: 'four-elements-full',
              title: __( 'Four Elements' ),
              description: __( 'Four Elements' ),
              icon: 'format-image',
              innerBlocks: [createBlock('custom-blocks/form-dropdown-element', {}), 
              createBlock('custom-blocks/form-dropdown-element', {}),
              createBlock('custom-blocks/form-dropdown-element', {}),
              createBlock('custom-blocks/form-dropdown-element', {})],
              scope: [ 'inserter' ],
              
            },
            {
              name: 'five-elements-full',
              title: __( 'Five Elements' ),
              description: __( 'Five Elements' ),
              icon: 'format-image',
              innerBlocks: [createBlock('custom-blocks/form-dropdown-element', {}), 
              createBlock('custom-blocks/form-dropdown-element', {}),
              createBlock('custom-blocks/form-dropdown-element', {}),
              createBlock('custom-blocks/form-dropdown-element', {}),
              createBlock('custom-blocks/form-dropdown-element', {})],
              scope: [ 'inserter' ],
              
            },
          ],
            onSelect: (nextVariation = defaultVariation) => {
              if (nextVariation.attributes) {
                setAttributes(nextVariation.attributes);
              }
        
              if (nextVariation.innerBlocks) { 
                replaceInnerBlocks(clientId, (0, createBlocksFromInnerBlocksTemplate)(nextVariation.innerBlocks), true);
              }
              
            },
            allowSkip: true
          }));
        }
  
        function ColumnsEditContainer({
          updateColumns,
          clientId
        }) {
  
          
            // Counting how many elements have been added (excluding the headline and the button)
            let innerBlocks = wp.data.select('core/block-editor').getBlocks(clientId);
            const innerBlocksElements = innerBlocks.filter(block => block.name === 'custom-blocks/form-dropdown-element');
          
          
            const {
              count
            } = (0, useSelect)(select => {
              return {
                count: innerBlocksElements.length
              };
            }, [clientId]);
  
            
            // props.setAttributes({listElementsArray: innerBlocksElements});
          //   listElementsArray.push(el('li', {}, 
          // el('label', {'for': props.attributes.clientIdAttributes[i].attributes.idAttribute}, props.attributes.clientIdAttributes[i].attributes.titleAttribute)
          // ))
          //funktioniert immer noch nicht...
            
            
            
          const blockProps = (0, useBlockProps)({
        
          });
          props.setAttributes({numberOfElements: count});
          
  
          const {
            tryingItz
          } = (0, useSelect)(select => {
            return {
              tryingItz: innerBlocks
            };
          }, [clientId]);
  
          console.log(tryingItz);
  
          props.setAttributes({listElementsArrays: tryingItz});
          console.log(props.attributes.listElementsArrays);
  
  
          const innerBlocksProps = (0, useInnerBlocksProps)(blockProps, {
            allowedBlocks: ['core/column'],
            orientation: 'horizontal',
            renderAppender: false,
            attributes: {count: count}
          });
          console.log(blockProps);
  
          
          
          return el(React.Fragment, null, el(InspectorControls, null, 
            
            el(PanelBody, {title: 'Required Information'},
  
            
            
           
          el(TextControl, {
            label: 'Placeholder',
            value: props.attributes.placeholderAttribute,
            onChange: (newPlaceholder) => {
              props.setAttributes({placeholderAttribute: newPlaceholder});
            }
          }
            ),
            el(RangeControl, {
            label: 'Elements',
            value: count,
            onChange: value => updateColumns(count, value),
            min: 1,
            max: Math.max(12, count)
          }), count > 12 && el(Notice, {
            status: "warning",
            isDismissible: false
          }, (0, __)('This slide count exceeds the recommended amount and may cause visual breakage.'))),
  
          el(PanelBody, {title: 'Optional Information'},
          el(CheckboxControl, {
            label: 'Required',
            checked: props.attributes.requiredAttribute,
            onChange: (newChecked) => {
              props.setAttributes({requiredAttribute: newChecked});
            }
          }
            ),
            el(CheckboxControl, {
              label: 'Disabled',
              checked: props.attributes.disabledAttribute,
              onChange: (newDisabled) => {
                props.setAttributes({disabledAttribute: newDisabled});
              }
            }
              ),
              el(MenuGroup, {label: 'Stil'}, 
              el(MenuItemsChoice, {
                choices: choicesStyleAttribute, 
                value: props.attributes.styleAttribute, 
                onSelect: (newStyle) => {
                  props.setAttributes({styleAttribute: newStyle});
                }
              })), 
          
          
          )
          
          
          
          ), 
          el("div", {...innerBlocksProps, count: count, style: { outline: '1px solid gray', padding: 5 }}));
        }
  
        const ColumnsEditContainerWrapper = withDispatch((dispatch, ownProps, registry) => ({
  
          
          /**
           * Updates the column count, including necessary revisions to child Column
           * blocks to grant required or redistribute available space.
           *
           * @param {number} previousColumns Previous column count.
           * @param {number} newColumns      New column count.
           */
          updateColumns(previousColumns, newColumns) {
            const {
              clientId
            } = ownProps;
            const {
              replaceInnerBlocks
            } = dispatch(blockEditStore);
            const {
              getBlocks
            } = registry.select(blockEditStore);
            let innerBlocks = getBlocks(clientId);
            
           
            
            const isAddingColumn = newColumns > previousColumns;
        
            if (isAddingColumn) {
              innerBlocks = [...innerBlocks, ...times(newColumns - previousColumns, (i) => {
                return createBlock('custom-blocks/form-dropdown-element', {class: 'item' + newColumns});
              })];
              
            } else {
              // The removed column will be the last of the inner blocks.
              innerBlocks = (0, dropRight)(innerBlocks, previousColumns - newColumns);
              innerBlocks = [...innerBlocks];
            }
            
            replaceInnerBlocks(clientId, innerBlocks);
  
          }
  
        
        
        }))(ColumnsEditContainer);
  
        
  
          const {
            clientId
          } = props;
  
          
  
          // tryingIt =   (0, useSelect)(select => select(blockEditStore).getBlocks(clientId), [clientId])
          // props.setAttributes({clientIdAttributes: (0, useSelect)(select => select(blockEditStore).getBlocks(clientId), [clientId])});
          const numberTest = (0, useSelect)(select => select(blockEditStore).getBlocks(clientId).length, [clientId]);
          const hasInnerBlocks = numberTest > 0;
          // const hasInnerBlocks = (0, useSelect)(select => select(blockEditStore).getBlocks(clientId).length > 0, [clientId]);
  
          const Component = hasInnerBlocks ? ColumnsEditContainerWrapper : Placeholder;
  
          return el(Component, props);   
  }
      
      ,
  
   
  
      save: function(props) {
       console.log(props);
      
        console.log(InnerBlocks)
        const something = [];
        for(i=0; i< props.attributes.numberOfElements; i++) {
          something.push(el('li', {},
          el('label', {
          'for': props.attributes.listElementsArrays[i].attributes.idAttribute}, 
          )))
        }
        
        return el( 'div', { required: props.attributes.requiredAttribute, className:`form__dropdown form__field ${props.attributes.styleAttribute}`, disabled: props.attributes.disabledAttribute},
        el('details', {className: "custom-select" }, 
        el('summary', {className: "radios"}, 
        el('p', { className: 'placeholder'}, props.attributes.placeholderAttribute),
        el( InnerBlocks.Content, {} ),
        ),//end summary
        el('ul', {className: 'list'}, something),
        
        )
          
        );
      },
    } );
  } )(
  window.wp.blocks,
  window.wp.blockEditor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
  );