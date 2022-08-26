( function(blocks, editor, components, i18n, element) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var InnerBlocks = wp.editor.InnerBlocks;
  
    registerBlockType( 'custom-blocks/media-quote', {
      title: 'Media Quote', // The title of block in editor.
      icon: 'book-alt', // The icon of block in editor.
      category: 'custom-blocks', // The category of block in editor.
      edit: function() { //Texteditor von Wordpress
        return el( 'div', { style: { outline: '1px solid gray', padding: 5 } },
          el(
            InnerBlocks,
            {
              template: [
                ['core/image', {className : 'media-quote-image'}],
                ['core/quote',{className: 'media-quote-quote'}],
              ],
            }
          )
        );
      },
      save: function() {
        return el( 'section', { className:'module qp-media-quote media-quote wp-mq' },
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
