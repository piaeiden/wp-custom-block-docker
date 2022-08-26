( function(blocks, editor, components, i18n, element) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var InnerBlocks = wp.editor.InnerBlocks;
    var useBlockProps = wp.blockEditor.useBlockProps;
  
  
    registerBlockType( 'custom-blocks/certificate-teaser', {
      title: 'Certificate Teaser', // The title of block in editor.
      icon: 'admin-comments', // The icon of block in editor.
      category: 'custom-blocks', // The category of block in editor.
      
      edit: function() {
        const blockProps = (0, useBlockProps)({className: 'certificate-teaser'});
        return el( 'div', { ...blockProps, style: { outline: '1px solid gray', padding: 5 } },
          el(
            InnerBlocks, //Blocks die ausfüllbar sind für Anwender
            {
              template: [
                ['core/heading',{'placeholder':'H2. Mandatory. Write the headline in one line (without any breaks) and bold the part, that should be in the first line. The headline will automatically break. Recommended: 70 characters.', 'level':2}],
                  ['core/columns',{}, 
                  [
                    ['core/column',{},
                      [
                          ['core/image',{}],
                          ['core/heading',{'placeholder':'H3. Recommended: 50 charaters.', 'level':3}]
                      ]
                    ],
                    ['core/column',{},
                      [
                          ['core/image',{}],
                          ['core/heading',{'placeholder':'H3. Recommended: 50 characters.', 'level':3}]
                      ]
                    ],           
                    ['core/column',{},
                      [
                          ['core/image',{}],
                          ['core/heading',{'placeholder':'H3. Recommended: 50 characters.', 'level':3}]
                      ]
                    ]
                  ]
  
                  ], // END COLUMNS
                  ['core/button',{'placeholder':'CTA-Button. Optional. Recommended: 30 characters.', className: 'alt'}],
              ] // END TEMPLATE
  
            }
          )
        );
      },
  
  
      save: function() {
        return el( 'section', { className:'module wp-block-itk-certificate-teaser certificate-teaser'},
          el( InnerBlocks.Content, {} )
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