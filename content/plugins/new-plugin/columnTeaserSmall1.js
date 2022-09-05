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
  
    registerBlockType( 'itk/column-teaser-small-1', {
      title: '3 Columns Teaser', // The title of block in editor.
      icon: 'admin-comments', // The icon of block in editor.
      category: 'itk',
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
        "attributes": {
          "numberOfElements": {
            "type": "number",
            "default": 0
          }
        },
    
      edit: function(props) {
  
        function Placeholder({
          clientId,
          name,
          setAttributes
        }) {
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
          const array = [['core/heading',{'placeholder':'H2, module overline. Optional. Recommended: 50 characters.', 'level':2}]];
          for (i=0; i < number; i++) {        
            array.push(createBlock('itk/column-teaser-small-1-element', {}));
          }
          array.push(['core/button',{'placeholder':'CTA-Button. Optional. Recommended: 30 characters.', className: 'alt'}])
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
              innerBlocks: addElements(3),
              scope: [ 'inserter' ],
              // attributes: {variationElements: 3}
            },
            {
              name: 'four-elements-full',
              title: __( 'Four Elements' ),
              description: __( 'Four Elements' ),
              icon: 'format-image',
              innerBlocks: addElements(4),
              scope: [ 'inserter' ],
              
            },
            {
              name: 'five-elements-full',
              title: __( 'Five Elements' ),
              description: __( 'Five Elements' ),
              icon: 'format-image',
              innerBlocks: addElements(5),
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
            const innerBlocksElements = innerBlocks.filter(block => block.name === 'itk/column-teaser-small-1-element');
            
          const {
            count
          } = (0, useSelect)(select => {
            return {
              count: innerBlocksElements.length
            };
          }, [clientId]);
          const blockProps = (0, useBlockProps)({
        
          });
          props.setAttributes({numberOfElements: count});
  
          
  
  
  
          const innerBlocksProps = (0, useInnerBlocksProps)(blockProps, {
            allowedBlocks: ['core/column'],
            orientation: 'horizontal',
            renderAppender: false
          });
          return el(React.Fragment, null, el(InspectorControls, null, el(PanelBody, null, el(RangeControl, {
            label: 'Elements',
            value: count,
            onChange: value => updateColumns(count, value),
            min: 0,
            max: Math.max(12, count)
          }), count > 12 && el(Notice, {
            status: "warning",
            isDismissible: false
          }, (0, __)('This slide count exceeds the recommended amount and may cause visual breakage.')))), 
          el("div", {...innerBlocksProps, style: { outline: '1px solid gray', padding: 5 }}));
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
            
            let innerBlocksButton = innerBlocks.pop();
        
            const isAddingColumn = newColumns > previousColumns;
        
            if (isAddingColumn) {
              innerBlocks = [...innerBlocks, ...times(newColumns - previousColumns, (i) => {
                return createBlock('itk/column-teaser-small-1-element', {});
              }), innerBlocksButton];
            } else {
              // The removed column will be the last of the inner blocks.
              innerBlocks = (0, dropRight)(innerBlocks, previousColumns - newColumns);
              innerBlocks = [...innerBlocks, innerBlocksButton];
            }
            
            replaceInnerBlocks(clientId, innerBlocks);
  
          }
        
        }))(ColumnsEditContainer);
  
  
          const {
            clientId
          } = props;
  
          
          
          
  
          const numberTest = (0, useSelect)(select => select(blockEditStore).getBlocks(clientId).length, [clientId]);
          const hasInnerBlocks = numberTest>0;
  
          const Component = hasInnerBlocks ? ColumnsEditContainerWrapper : Placeholder;
  
          return el(Component, props);   
  }
      
      ,
  
   
  
      save: function(props) {
        return el( 'section', { className:`module wp-block-itk-column-teaser-small-1 column-teaser-small column-teaser-small-1 module-elements-${props.attributes.numberOfElements}` },
          el( InnerBlocks.Content, {} ),
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