<?php
/**
 * Plugin Name: Test Plugin
 * Author: John Doe
 * Version: 1.0.0
 */

function custom_block_categories( $categories ) 
{
  return array_merge(
    $categories,
    [
      [
        'slug'  => 'custom-blocks',
        'title' => 'CustomBlocks',
      ],
    ]
  );
}

add_action( 'block_categories', 'custom_block_categories', 10, 2 );


/**
 * ---------------------------
 */

function loadCertificateTeaser() {
  wp_enqueue_script(
    'certificate-teaser',
    plugin_dir_url(__FILE__) . 'certificateTeaser.js',
    array('wp-blocks','wp-editor'),
    true
  );
}
   
add_action('enqueue_block_editor_assets', 'loadCertificateTeaser');

/**
 * ---------------------------
 */

 function loadFormDropdown() {
  wp_enqueue_script(
    'form-dropdown',
    plugin_dir_url(__FILE__) . 'form-dropdown.js',
    array('wp-blocks', 'wp-editor'),
    true
  );
 }

 add_action('enqueue_block_editor_assets', 'loadFormDropdown');

 /**
  * -------------------
  */

  function loadImageUpload() {
    wp_enqueue_script(
      'image-upload',
      plugin_dir_url(__FILE__) . 'image-upload.js',
      array('wp-blocks', 'wp-editor'),
      true
    );
   }
  
   add_action('enqueue_block_editor_assets', 'loadImageUpload');
  

  /**
   * ------
   */
function loadVincentBlock() {
  wp_enqueue_script(
  'vincent-block',
  plugin_dir_url(__FILE__) . 'vincent-block.js',
  array('wp-blocks', 'wp-editor'),
  true
  );
}

add_action('enqueue_block_editor_assets', 'loadVincentBlock');


function loadColumnTeaser() {
  wp_enqueue_script(
  'column-teaser-small-1',
  plugin_dir_url(__FILE__) . 'columnTeaserSmall1.js',
  array('wp-blocks', 'wp-editor'),
  true
  );
}

add_action('enqueue_block_editor_assets', 'loadColumnTeaser');

/**
 * 
 */

function loadFastBlock() {
  wp_enqueue_script(
  'der-schnelle-block',
  plugin_dir_url(__FILE__) . 'der-schnelle-block.js',
  array('wp-blocks', 'wp-editor'),
  true
  );
}

add_action('enqueue_block_editor_assets', 'loadFastBlock');

/**
 * Media Quote
 */

function loadMediaQuote() {
  wp_enqueue_script(
  'media-quote',
  plugin_dir_url(__FILE__) . 'media-quote.js',
  array('wp-blocks', 'wp-editor'),
  true
  );
}

add_action('enqueue_block_editor_assets', 'loadMediaQuote');