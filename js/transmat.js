/**
 * Created by jtsjordan on 3/2/17.
 */
// Background
  var $background = $( '#backrect' );

// Interface Grouping
  var $interface = $( '#interface' );
    var $characters = $( '#characters' );
      var $character_0 = $( '#character_0' );
      var $character_1 = $( '#character_1' );
      var $character_2 = $( '#character_2' );

// Ghost Objects
  var $ghost = $( '#ghost' );
    var $eye   = $( '#eye' );
    var $shell = $( '#shell' );
      var $top_block    = $( '#top_block' );
      var $left_block   = $( '#left_block' );
      var $bottom_block = $( '#bottom_block' );
      var $right_block  = $( '#right_block' );

// Loading Ring Objects
  var $load_ring   = $( '#loading_ring' );
    var $dashes      = $( '#dashes' );
    var $inner_ring  = $( '#inner_ring' );
    var $outter_ring = $( '#outter_ring' );

// Emblem Object
  var $emblem = $( '#emblem' );

// Top Slot Objects
  var $top_slots  = $( '#top_slots' );
    var $top_slot_1 = $( '#top_slot1' );
    var $top_slot_2 = $( '#top_slot2' );

    var $main_slot_top = $( '.main_slot.top' );

// Front / Back Panels
  var $front_panel = $( '.front_panel' );
  var $back_panel  = $( '.back_panel' );

  var $left_panel  = $( '.left_panel' );
  var $right_panel = $( '.right_panel' );

  var $front_left_panel  = $( '.front_panel.left_panel' );
  var $back_left_panel = $( '.back_panel.left_panel' );

  var $front_right_panel  = $( '.front_panel.right_panel' );
  var $back_right_panel = $( '.back_panel.right_panel' );

// Right Slot Objects
  var $right_slots  = $( '#right_slots' );
    var $right_slot_1 = $( '#right_slot1' );
    var $right_slot_2 = $( '#right_slot2' );
    var $right_slot_3 = $( '#right_slot3' );
    var $right_slot_4 = $( '#right_slot4' );
    var $right_slot_5 = $( '#right_slot5' );

// Left Slot Objects
  var $left_slots  = $( '#left_slots' );
    var $left_slot_1 = $( '#left_slot1' );
    var $left_slot_2 = $( '#left_slot2' );
    var $left_slot_3 = $( '#left_slot3' );
    var $left_slot_4 = $( '#left_slot4' );
    var $left_slot_5 = $( '#left_slot5' );
      var switcher = $( '.switcher' );

// Main Slot
  var $main_slot = $( '.main_slot' );
  var $main_slot_frame = $( '.main_slot_frame' );
    var $main_slot_frame_left  = $( '.main_slot_frame.left' );
    var $main_slot_frame_right = $( '.main_slot_frame.right' );
    var $main_slot_frame_top   = $( '.main_slot_frame.top' );

// Inventory Slot Objects
  var $inv_slots  = $( '#inv_slots' );
    var $inv_button_1 = $( '#inv_button_1' );
    var $inv_button_2 = $( '#inv_button_2' );
    var $inv_button_3 = $( '#inv_button_3' );

// Bucket Objects
  var $buckets = $( '.bucket' );
    var $bucket_left   = $( '.bucket.left' );
    var $bucket_right  = $( '.bucket.right' );
    var $bucket_top    = $( '.bucket.top' );
    var $bucket_bottom = $( '.bucket.bottom' );

// Bucket Masks
  var $bucket_masks = $( '.bucket_mask' );
    var $bucket_mask_left  = $( '.bucket_mask.left' );
    var $bucket_mask_right = $( '.bucket_mask.right' );

    var $bucket_mask_top_one   = $( '.bucket_mask.top.one' );
    var $bucket_mask_top_two  = $( '.bucket_mask.top.two' );

    var $bucket_mask_inventory  = $( '.bucket_mask.inventory' );

// Slot Masks
  var $slot_mask_right  = $( '.slot_mask.right' );
  var $slot_mask_left   = $( '.slot_mask.left' );
  var $slot_mask_bottom = $( '.slot_mask.bottom' );
  var $slot_mask_top    = $( '.slot_mask.top' );

// Beam Masks
  var $beam_mask_right  = $( '.beam_mask.right' );
  var $beam_mask_left   = $( '.beam_mask.left' );
  var $beam_mask_top    = $( '.beam_mask.top' );
  var $beam_mask_bottom = $( '.beam_mask.bottom' );

// Beam Class
  var $beam = $( '.beam' );


  var focused_character = 0;

   $( document ).ready( function(){

     //TweenLite.set( $ghost, { scale:.7 });

     rotateMasks();
     shiftInventoryBuckets();

     loadInitialInterface();
     // splitCharacters();

     TweenLite.to( $ghost, 0, { scale:3, transformOrigin:"center center" } );
     TweenLite.to( $load_ring, 0, { scale:3, transformOrigin:"center center" } );

   });

/* --- Click Handlers --- */

  var slotActive = false;

  // Main Slot
     $( '.main_slot' ).click( function(){

       if ( slotActive ) {

         var thisClass = $( this ).attr( 'class' );

         if ( thisClass == "main_slot slot_active" ) {

           console.log( 'This is active.' );
           console.log( '-- Equipped Item Popup --' );

         } else {

           $( '.slot_active' ).attr( 'class', 'main_slot' );

           alternateBeam( this, false );

         }

       } else {

         mainSlotAction( this );

       }


     });

  // Slot Switcher
      var frontVisible = true;

      $( '.switcher' ).click( function(){

        $( '.bucket' ).css( 'visibility', 'hidden' );

        unswingSlots();
        switchPanels();

      });

  // Inventory Button
     $( '.inv_button' ).click( function(){

       var buckTarget = $( this ).siblings( '.bucket' );

       hideBuckets();
       swingSlots();
       showInventoryBucket( buckTarget );

     });

  // Bucket Slot
     $( '.bucket_slot' ).click( function(){

       shellAnimation();

     });

  // Ghost
     $( $ghost ).click( function(){

       shellAnimation();

     });

  // Background
     $( '#backrect' ).click( function(){

      $( '.bucket' ).css( 'visibility', 'hidden' );

      $( '.slot_active' ).attr( 'class', 'main_slot' );
      slotActive = false;

      unswingSlots();

      // TweenLite.to( $slot_mask_l1_top, .25, { autoAlpha:0 } );
      // TweenLite.to( $slot_mask_l1_top, .25, { y:-600 } );
      // TweenLite.to( $slot_mask_l1_top, .25, { x:0 } );
      // TweenLite.to( $slot_mask_l1_top, .25, { y:0, autoAlpha:1 } );

    });

/* --- End Click Handlers --- */


/* --- Animation Timelines --- */

  // Main Slot Action
    function mainSlotAction( slot ) {

      $( slot ).attr( 'class', 'main_slot slot_active' );

      hideBuckets();

      var buckTarget = $( slot ).siblings( '.bucket' );
      var el = $( slot ).parent()[0];

      // Grab Beam Class From Slot
        var beamTarget = $( slot ).siblings( '.beam' );
        var beamClass  = $( beamTarget ).attr( 'class' );

      // Convert Class To jQuery Selector
        var beamId   = "." + beamClass.replace(/ /g,".");
        var beamSide = beamClass.split(' ')[1];

        console.log( beamSide );

      showBucket( buckTarget, beamId, beamSide );
      swingSlots( el.id );

      slotActive = true;

    }

  // Show Slot Beam
    function showSlotBeam( beamId, beamSide ) {

      console.log(beamId);

      var beamTimeline = new TimelineMax();

      // Ghost to Side
        if ( beamSide == 'left' ) {

          beamTimeline.append( TweenLite.to( $ghost, .5, { scale:1.5, x:215, y:15 } ));

        } else if ( beamSide == 'right' ) {

          beamTimeline.append( TweenLite.to( $ghost, .5, { scale:1.5, x:-220, y:15 } ));

        } else if ( beamSide == 'top' ) {

          console.log('Ghost top move');
          beamTimeline.append( TweenLite.to( $ghost, .5, { scale:1.5, x:0, y:-50 } ));

        } else {

          console.log('ghost bottom move');
          beamTimeline.append( TweenLite.to( $ghost, .5, { scale:1.5, x:0, y:-50 } ));

        }

        beamTimeline.add( "slot-masks", .5 );
        beamTimeline.add( "beam-masks", 1 );

      // Slide Beam Mask
        beamTimeline.append( TweenLite.to( beamId, 0, { autoAlpha:1 } ));

        beamTimeline.to( $slot_mask_right, .5, { x: -600 }, "slot-masks" );
        beamTimeline.to( $slot_mask_left, .5, { x: 550 }, "slot-masks" );
        beamTimeline.to( $slot_mask_bottom, .5, { y:-600 }, "slot-masks" );
        beamTimeline.to( $slot_mask_top, .5, { y:720 }, "slot-masks" );

        beamTimeline.to( $beam_mask_right, .5, { x:-600, y:-300 }, "beam-masks" );
        // beamTimeline.to( $beam_mask_left, .5, { x:-600, y:-300 }, "beam-masks"  );
        beamTimeline.to( $beam_mask_top, .5, { y:620 }, "beam-masks" );
        beamTimeline.to( $beam_mask_bottom, .5, { y:-600 }, "beam-masks" );

    }

  // Alternate Beam
    function alternateBeam( slot, centerGhost ) {

      var returnBeam = new TimelineMax();

        returnBeam.append( TweenLite.to( $beam_mask_right, 0, { x:0, y:0 } ));
        returnBeam.append( TweenLite.to( $slot_mask_right, 0, { x:0 } ));
        returnBeam.append( TweenLite.to( $slot_mask_left, 0 , { x:0 } ) );
        returnBeam.append( TweenLite.to( $beam, 0, { autoAlpha:0 } ));

      if ( centerGhost ) {

        returnBeam.append( TweenLite.to( $ghost, 0, { scale:1, x:0, y:0, delay:.1 } ));

      }

      mainSlotAction( slot );

    }

  // Hide Beam
    function hideBeam( centerGhost ) {

      var returnBeam = new TimelineMax();

        returnBeam.add( "slot-masks", 0 );

        returnBeam.append( TweenLite.to( $beam_mask_right, 0, { x:0, y:0 } ));
        returnBeam.append( TweenLite.to( $beam_mask_top, 0, { y:0 } ));
        returnBeam.append( TweenLite.to( $beam_mask_bottom, 0, { y:0 } ));
        returnBeam.to( $slot_mask_right, .25, { x:0 }, "slot-masks" );
        returnBeam.to( $slot_mask_left, .25, { x:0 }, "slot-masks" );
        returnBeam.to( $slot_mask_bottom, .25, { y:0 }, "slot-masks" );
        returnBeam.to( $slot_mask_top, .25, { y:0 }, "slot-masks" );
        returnBeam.append( TweenLite.to( $beam, .01, { autoAlpha:0 } ));

        if ( centerGhost ) {

          returnBeam.append( TweenLite.to( $ghost, .75, { scale:3, x:0, y:0, delay:.1 } ));

        }

    }

  // Ghost To Side
    function moveGhost( side ) {

      // BEAM START POINT

        // Left Slot Point
          //TweenLite.to( $ghost, .75, { scale:0.7, x:250, y:30 } );

        // Right Slot Point


        // Top Slot Point


        // Inv Slot Point


      // BEAM END POINTS


    }

  // Return Ghost
    function centerGhost() {

      TweenLite.to( $ghost, .75, { scale:1, x:0, y:0, delay:.1 } );

    }

  // Initial Interface Load
    function loadInitialInterface() {

      splitCharacters();

      var timeline = new TimelineMax();

      // timeline.append( TweenLite.fromTo( $load_ring, ., { scale:0, x:'50%', y:'50%', autoAlpha:0 }, { scale:1, x:'0%', y:'0%', autoAlpha:1 } ));
      TweenLite.to( $inner_ring , 16 , { rotation:1080, transformOrigin:"center center", delay: 0 } );
      TweenLite.to( $outter_ring , 16 , { rotation:-1080, transformOrigin:"center center", delay: 0 } );
      timeline.append( TweenLite.to( $load_ring, 3, { autoAlpha: 0, delay:2 } ));
      timeline.append( TweenLite.fromTo( $interface, 3, { scale:0, x:'15%', y:'50%', autoAlpha:1 }, { scale:1, x:'0%', y:'0%', autoAlpha:1 } ));
      timeline.append( TweenLite.to( $character_1, 0.05, { autoAlpha: 0, delay:0.1 } ));
      timeline.append( TweenLite.to( $character_2, 0.05, { autoAlpha: 0 }));

    }

  // Split Characters
    function splitCharacters() {

      TweenLite.to( $character_1, .5, { scale:1, x:'-110%' } );
      TweenLite.to( $character_2, .5, { scale:1, x:'110%' } );

    }

  // Bucket Open Sequence
    function showBucket( buckTarget, beamId, beamSide ) {

      showSlotBeam( beamId, beamSide );

      var bucketTimeline = new TimelineMax();

      bucketTimeline.add( "bucket-masks", .75 );

      TweenLite.to( buckTarget, .25, { autoAlpha:1 });
      bucketTimeline.to( $bucket_mask_left, 1, { x:310, y:475 }, "bucket-masks" );
      bucketTimeline.to( $bucket_mask_right, 1, { x:-200, y:375 }, "bucket-masks" );
      bucketTimeline.to( $bucket_mask_top_one, 1, { x:150, y:200 }, "bucket-masks" );
      bucketTimeline.to( $bucket_mask_top_two, 1, { x:-300, y:180 }, "bucket-masks" );

    }

  // Inventory Bucket Open
    function showInventoryBucket( buckTarget ) {

      var invBucketTimeline = new TimelineMax();

      invBucketTimeline.add( "bucket-time", 2 );

      invBucketTimeline.to( buckTarget, .5, { y:0, autoAlpha:1 }, "bucket-time" );

    }

  // Bucket Close Sequence
    function hideBuckets() {

      TweenLite.set( $buckets, { autoAlpha: 0 } );
      TweenLite.set( '.bucket_mask', { x:0, y:0 } );

      //hideBeams();

    }

  // Swing Slots
    function swingSlots( id ) {

      var activeSide = "none";

      // Left Slots
        $main_slot_frame_left.each( function() {

          if ( this.id == id ) {

            TweenLite.to( this, .5, { css: { scale:1.1, x:30, rotationY: 0, rotationX: 0, skewY: 0 } });
            activeSide = "left";

          } else {

            TweenLite.to( $left_panel, .25, { scale:1 } );
            TweenLite.to( this, .5, { css: {scale:1, x:-30, rotationY: 45, rotationX: 0, skewY: 10 }});

          }

        });

      // Right Slots
        $main_slot_frame_right.each( function() {

        if ( this.id == id ) {

          TweenLite.to( $right_panel, .25, { scale:1, trasnformOrigin:"right" } );
          TweenLite.to( this, .5, { css: { scale:1.1, transformOrigin:"right", x:-30, rotationY: 0, rotationX: 0, skewY: 0 } });
          activeSide = "right";

        } else {

          TweenLite.to( this, .5, { css: { scale:1, transformOrigin:"right", rotationY: -45, rotationX: 0, skewY: -20 }});
          TweenLite.to( this, .5, { css: { x:30 } });

        }

      });

      // Top Slots
        $main_slot_frame_top.each( function() {

        if ( this.id == id ) {

          TweenLite.to( this, .5, { css: { scale:1.1, y:120 } });

        } else {

          TweenLite.to( this, .5, { css: { scale:1, y:0 } });

        }

      });

      // Shrink Unused Side
        if ( activeSide === "left" ) {

          TweenLite.to( $right_panel, .25, { scale:.8, transformOrigin: 'right' } );

        } else if ( activeSide === "right" ) {

          TweenLite.to( $left_panel, .25, { scale:.8 } );

        } else {

          TweenLite.to( $right_panel, .25, { scale:.8, transformOrigin: 'right' } );
          TweenLite.to( $left_panel, .25, { scale:.8 } );

        }

    }

  // Unswing Slots
    function unswingSlots() {

      TweenLite.to( $right_panel, .25, { scale:1 } );
      TweenLite.to( $left_panel, .25, { scale:1 } );

      TweenLite.to( $main_slot_frame, .5, { css: { scale:1, x:0, rotationY: 0, rotationX: 0, skewY: 0 } });
      TweenLite.to( $main_slot_frame_top, .5, { css: { scale:1, y:0 } });

      //returnGhost();
      hideBeam( true );

    }

  // Ghost Shell Sequence
    function shellAnimation() {

      var timeline = new TimelineMax();

      // Expand Shell
      timeline.append( TweenLite.to( $top_block , 0.05 , { y:'-30%' } ) );
      timeline.append( TweenLite.to( $left_block , .1 , { x:'-30%' } ) );
      timeline.append( TweenLite.to( $bottom_block , .1 , { y:'30%' } ) );
      timeline.append( TweenLite.to( $right_block , .15 , { x:'30%' } ) );

      // Rotate CW
      timeline.append( TweenLite.to( $shell , 1 , { rotation:360, transformOrigin:"center center" } ) );

      // Rotate CCW
      timeline.append( TweenLite.to( $shell , 1 , { rotation:0, transformOrigin:"center center" } ) );

      // Collapse Shell
      timeline.append( TweenLite.to( $top_block , .05 , { y:'0%' } ) );
      timeline.append( TweenLite.to( $left_block , .1 , { x:'0%' } ) );
      timeline.append( TweenLite.to( $bottom_block , .15 , { y:'0%' } ) );
      timeline.append( TweenLite.to( $right_block , .25 , { x:'0%' } ) );

    }

  // Slide Characters Left
    function swipeLeft() {

        if ( focused_character == 0 ) {

          TweenLite.to( $characters, 1, { x:'-34.5%', y:'0%' });
          TweenLite.to( $character_2, 1, { autoAlpha: 1 } );
          TweenLite.to( $character_0, 1, { autoAlpha: 0 } );
          TweenLite.to( $character_1, 1, { autoAlpha: 0 } );

          focused_character = 2;

          checkPanels();

        } else if ( focused_character == 1 ) {

            TweenLite.to( $characters, 1, { x:'0%', y:'0%' });
            TweenLite.to( $character_0, 1, { autoAlpha: 1 } );
            TweenLite.to( $character_2, 1, { autoAlpha: 0 } );
            TweenLite.to( $character_1, 1, { autoAlpha: 0 } );

            focused_character = 0;

            checkPanels();

        }

    }

  // Slide Characters Right
    function swipeRight() {

      if ( focused_character == 0 ) {

        TweenLite.to( $characters, 1, { x:'34.5%', y:'0%' });
        TweenLite.to( $character_1, 1, { autoAlpha: 1 } );
        TweenLite.to( $character_0, 1, { autoAlpha: 0 } );
        TweenLite.to( $character_2, 1, { autoAlpha: 0 } );

        focused_character = 1;

        checkPanels();

      } else if ( focused_character == 2 ) {

          TweenLite.to( $characters, 1, { x:'0%', y:'0%' });
          TweenLite.to( $character_0, 1, { autoAlpha: 1 } );
          TweenLite.to( $character_1, 1, { autoAlpha: 0 } );
          TweenLite.to( $character_2, 1, { autoAlpha: 0 } );

          focused_character = 0;

          checkPanels();

      }

    }

  // Switch Panels
    function switchPanels() {

      if ( frontVisible ) {

        // Left
        TweenLite.to( $front_left_panel , .75 , { x:'-200', autoAlpha:0 } );
        TweenLite.fromTo( $back_left_panel , .75 , { x:'200', autoAlpha: 0 }, { x:'0', autoAlpha:1 } );

        // Right
        TweenLite.to( $front_right_panel , .75 , { x:'200', autoAlpha: 0 } );
        TweenLite.fromTo( $back_right_panel , .75 , { x:'-200', autoAlpha: 0 }, { x:'0', autoAlpha: 1 } );

        frontVisible = false;

      } else {

        // Left
        TweenLite.fromTo( $front_left_panel , .75 , { x:'-200', autoAlpha:0 }, { x:'0', autoAlpha: 1 } );
        TweenLite.fromTo( $back_left_panel , .75 , { x:'0', autoAlpha:1 }, { x:'200', autoAlpha:0 } );

        // Right
        TweenLite.fromTo( $front_right_panel , .75 , { x:'200', autoAlpha: 0 }, { x:'0', autoAlpha: 1 } );
        TweenLite.fromTo( $back_right_panel , .75 , { x:'0', autoAlpha: 1 }, { x:'-200', autoAlpha: 0 } );

        frontVisible = true;

      }

    }

  // Rotate Bucket Masks
    function rotateMasks() {

      // TweenLite.set( $bucket_masks, {rotation:-45, transformOrigin:"center center"} );
      TweenLite.set( $bucket_mask_left, {rotation:-45, transformOrigin:"center center"} );
      TweenLite.set( $bucket_mask_right, {rotation:-45, transformOrigin:"center center"} );

      TweenLite.set( $beam_mask_right, { rotation: -45, transformOrigin: "center center" } );
      // TweenLite.set( $bucket_mask_inventory, { rotation:0, transformOrigin:"center center" } );

    }

  // Move Inventory Buckets To Bottom
    function shiftInventoryBuckets() {

      // Shift Bottom Buckets Down
      TweenLite.set( $bucket_bottom, { x:-5, y:585 } );

    }

/* --- End Animation Timelines --- */



/* --- Detect Swipe --- */

// Detect Drag on Background
  $( '#backrect' ).on( 'mousedown', function( e ) {

    $( this ).data( 'p0', { x: e.pageX, y: e.pageY } );

  }).on( 'mouseup', function( e ) {

    var p0 = $( this ).data( 'p0' ),
      p1 = { x: e.pageX, y: e.pageY },
      d = Math.sqrt( Math.pow( p1.x - p0.x, 2 ) + Math.pow( p1.y - p0.y, 2 ) );

    if ( d < 25 ) {

      console.log( 'clicked' );

    } else {

      console.log( 'dragged' );

      if ( p0.x > p1.x ) {

        console.log( 'left' );
        swipeLeft();

      } else {

        console.log( 'right' );
        swipeRight();

      }

    }

  });

/* --- End Detect Swipe --- */


// Check Panels
  function checkPanels() {

    if ( !frontVisible ) {

      switchPanels();

    }

  }


// Callback Gunctions
  function start(){
    console.log('start');
  }
  function update(){
    console.log('animating');
  }
  function complete(){
    console.log('end');
  }

