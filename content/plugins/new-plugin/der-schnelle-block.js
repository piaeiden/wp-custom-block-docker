( function(blocks, editor, components, i18n, element) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var InnerBlocks = wp.editor.InnerBlocks;
  
    registerBlockType( 'custom-blocks/der-schnelle-block', {
      title: 'FastBlock', // The title of block in editor.
      icon: 'admin-comments', // The icon of block in editor.
      category: 'custom-blocks', // The category of block in editor.


      edit: function() { //Texteditor von Wordpress
        return el( 'div', { style: { outline: '1px solid gray', padding: 5 } },
          el(
            InnerBlocks,
            {
              template: [
                ['core/button', {}],
                ['core/code', {}],
                ['core/textColumns', {className : "vincent-private-block"}],
                ['core/column', {}, ['core/image',{}], ['core/text',{}]],
                ['core/columns', {}]
            
              ],
            }
          )
        );
      },
      save: function() {
        return el( 'section', { className:'module egalKlasse' },
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
