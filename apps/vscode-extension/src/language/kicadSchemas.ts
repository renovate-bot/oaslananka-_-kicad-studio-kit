import type { SchemaNodeDefinition } from '../types';

// Nodes shared by all KiCad file types
const commonNodes: SchemaNodeDefinition[] = [
  // Document metadata
  { tag: 'version', description: 'Document format version.' },
  { tag: 'generator', description: 'Tool that created the file.' },
  { tag: 'generator_version', description: 'Version of the generator tool.' },
  { tag: 'paper', description: 'Paper size setting.' },
  { tag: 'title_block', description: 'Drawing title block fields.' },
  { tag: 'title', description: 'Document title.' },
  { tag: 'date', description: 'Document date.' },
  { tag: 'rev', description: 'Document revision.' },
  { tag: 'company', description: 'Company name.' },
  { tag: 'comment', description: 'Title block comment field.' },
  // Identification
  { tag: 'at', description: 'Position (X Y [angle]) of an element.' },
  { tag: 'uuid', description: 'Stable unique identifier.' },
  { tag: 'layer', description: 'Target drawing or copper layer.' },
  { tag: 'layers', description: 'Set of layers.' },
  { tag: 'property', description: 'Named property.' },
  { tag: 'name', description: 'Element name.' },
  { tag: 'type', description: 'Type classification.' },
  { tag: 'number', description: 'Numeric identifier.' },
  { tag: 'id', description: 'Numeric ID.' },
  // Geometry
  { tag: 'pts', description: 'Point list.' },
  { tag: 'xy', description: 'X/Y coordinate pair.' },
  { tag: 'xyz', description: 'X/Y/Z coordinate triple.' },
  { tag: 'start', description: 'Start point.' },
  { tag: 'end', description: 'End point.' },
  { tag: 'mid', description: 'Mid point of an arc.' },
  { tag: 'center', description: 'Center point of a circle or arc.' },
  { tag: 'size', description: 'Width/height dimensions.' },
  { tag: 'width', description: 'Width value.' },
  { tag: 'angle', description: 'Rotation angle in degrees.' },
  { tag: 'scale', description: 'Scale factor.' },
  { tag: 'mirror', description: 'Mirror transformation axis.' },
  { tag: 'offset', description: 'Positional offset.' },
  { tag: 'height', description: 'Height value.' },
  { tag: 'thickness', description: 'Thickness value.' },
  { tag: 'length', description: 'Length value.' },
  { tag: 'radius', description: 'Radius of a circle or arc.' },
  { tag: 'diameter', description: 'Diameter value.' },
  // Appearance
  { tag: 'effects', description: 'Text and style effects.' },
  { tag: 'stroke', description: 'Line stroke style.' },
  { tag: 'fill', description: 'Fill style.' },
  { tag: 'color', description: 'RGBA color values.' },
  { tag: 'font', description: 'Font settings.' },
  { tag: 'face', description: 'Font face name.' },
  { tag: 'justify', description: 'Text alignment/justification.' },
  { tag: 'bold', description: 'Bold text style.' },
  { tag: 'italic', description: 'Italic text style.' },
  { tag: 'underline', description: 'Underline text style.' },
  { tag: 'line_spacing', description: 'Text line spacing.' },
  { tag: 'hide', description: 'Hide this element.' },
  // Shared shapes (used in sch symbols, sch drawings, and PCB graphics)
  { tag: 'polyline', description: 'Connected polyline shape.' },
  { tag: 'rectangle', description: 'Rectangle shape.' },
  { tag: 'circle', description: 'Circle shape.' },
  { tag: 'arc', description: 'Arc shape.' },
  { tag: 'bezier', description: 'Bezier curve shape.' },
  { tag: 'text', description: 'Text annotation element.' },
  { tag: 'text_box', description: 'Bounded text box.' },
  { tag: 'image', description: 'Embedded image element.' },
  // Embedded files (used in .kicad_sch and .kicad_pcb)
  { tag: 'embedded_files', description: 'Collection of embedded files.' },
  { tag: 'embedded_file', description: 'Single embedded file entry.' },
  { tag: 'data', description: 'Binary data payload.' },
  { tag: 'checksum', description: 'Data integrity checksum.' },
  { tag: 'compress_algorithm', description: 'Compression algorithm for embedded data.' },
];

export const SCHEMATIC_SCHEMA: SchemaNodeDefinition[] = [
  // Root
  { tag: 'kicad_sch', description: 'Root node for KiCad schematic files.' },
  // Top-level structural
  { tag: 'lib_symbols', description: 'Embedded symbol definitions used by this schematic.' },
  { tag: 'bus_alias', description: 'Named alias for a multi-wire bus.' },
  { tag: 'no_connect', description: 'No-connect marker on an unconnected pin.' },
  { tag: 'bus', description: 'Bus line segment.' },
  { tag: 'bus_entry', description: 'Bus wire entry connector.' },
  { tag: 'wire', description: 'Wire segment between two points.' },
  { tag: 'junction', description: 'Electrical junction joining multiple wires.' },
  { tag: 'label', description: 'Local net label.' },
  { tag: 'global_label', description: 'Global net label shared across sheets.' },
  { tag: 'hierarchical_label', description: 'Hierarchical label crossing sheet boundaries.' },
  { tag: 'directive_label', description: 'Directive label for simulation.' },
  { tag: 'netclass_flag', description: 'Net class assignment flag.' },
  { tag: 'net_navigator_items', description: 'Net navigator panel state.' },
  { tag: 'net_navigator_item', description: 'Single net navigator entry.' },
  { tag: 'symbol', description: 'Symbol instance placed on the schematic.' },
  { tag: 'sheet', description: 'Hierarchical sheet instance.' },
  { tag: 'sheet_instances', description: 'Expanded instances for hierarchical sheets.' },
  { tag: 'symbol_instances', description: 'Expanded instances for placed symbols.' },
  // Symbol library definition sub-nodes
  { tag: 'pin_numbers', description: 'Pin number display settings.' },
  { tag: 'pin_names', description: 'Pin name display settings.' },
  { tag: 'in_bom', description: 'Include component in BOM.' },
  { tag: 'on_board', description: 'Include component on the PCB.' },
  { tag: 'exclude_from_sim', description: 'Exclude from simulation.' },
  { tag: 'exclude_from_bom', description: 'Exclude from BOM.' },
  { tag: 'exclude_from_board', description: 'Exclude from board.' },
  { tag: 'power', description: 'Marks symbol as a power symbol.' },
  { tag: 'extends', description: 'Parent symbol this one extends.' },
  { tag: 'convert', description: 'DeMorgan alternate body style.' },
  { tag: 'unit', description: 'Symbol unit group.' },
  { tag: 'unit_name', description: 'Human-readable unit label.' },
  // Pin definition
  { tag: 'pin', description: 'Pin definition or sheet hierarchical pin.' },
  { tag: 'electrical_type', description: 'Electrical type of a pin.' },
  { tag: 'graphic_style', description: 'Graphic style of a pin.' },
  { tag: 'direction', description: 'Pin direction.' },
  // Placed symbol sub-nodes
  { tag: 'lib_id', description: 'Symbol library identifier.' },
  { tag: 'reference', description: 'Reference designator.' },
  { tag: 'value', description: 'Component value.' },
  { tag: 'footprint', description: 'Linked footprint identifier.' },
  { tag: 'datasheet', description: 'Datasheet URL or path.' },
  { tag: 'description', description: 'Component description.' },
  { tag: 'fields_autoplaced', description: 'Whether fields were auto-placed.' },
  { tag: 'do_not_autoplace', description: 'Suppress auto-placement for this field.' },
  { tag: 'show_name', description: 'Show property name alongside its value.' },
  { tag: 'instances', description: 'Multi-project symbol instances.' },
  { tag: 'path', description: 'Hierarchical sheet path.' },
  { tag: 'page', description: 'Page number in hierarchical design.' },
  { tag: 'iref', description: 'Intersheet reference.' },
  { tag: 'shape', description: 'Visual shape of a label or pin.' },
  { tag: 'project', description: 'Project namespace for symbol instances.' },
  // Simulation model
  { tag: 'simulation_model', description: 'Simulation model attachment.' },
  { tag: 'spice_params', description: 'SPICE model parameters.' },
  ...commonNodes
];

export const PCB_SCHEMA: SchemaNodeDefinition[] = [
  // Root
  { tag: 'kicad_pcb', description: 'Root node for KiCad PCB files.' },
  // Top-level structural
  { tag: 'general', description: 'General board configuration.' },
  { tag: 'setup', description: 'Board setup and design rules.' },
  { tag: 'net', description: 'Electrical net definition.' },
  { tag: 'footprint', description: 'Footprint instance placed on the board.' },
  { tag: 'segment', description: 'Copper track segment.' },
  { tag: 'via', description: 'Copper via between layers.' },
  { tag: 'zone', description: 'Copper fill zone or keepout area.' },
  { tag: 'group', description: 'Group of related items.' },
  { tag: 'dimension', description: 'Mechanical dimension annotation.' },
  { tag: 'target', description: 'Alignment target marker.' },
  { tag: 'net_inspector_presets', description: 'Net inspector panel presets.' },
  { tag: 'net_inspector_selection', description: 'Net inspector panel selection.' },
  { tag: 'embedded_fonts', description: 'Embedded font data.' },
  // Graphic items
  { tag: 'gr_line', description: 'Graphic line.' },
  { tag: 'gr_arc', description: 'Graphic arc.' },
  { tag: 'gr_circle', description: 'Graphic circle.' },
  { tag: 'gr_rect', description: 'Graphic rectangle.' },
  { tag: 'gr_poly', description: 'Graphic polygon.' },
  { tag: 'gr_curve', description: 'Graphic bezier curve.' },
  { tag: 'gr_text', description: 'Graphic text item.' },
  { tag: 'gr_text_box', description: 'Graphic text box.' },
  { tag: 'gr_bezier', description: 'Graphic bezier.' },
  // General sub-nodes
  { tag: 'thickness', description: 'Board thickness.' },
  { tag: 'legacy_teardrops', description: 'Legacy teardrop compatibility flag.' },
  { tag: 'copper_layer_count', description: 'Number of copper layers.' },
  // Setup sub-nodes
  { tag: 'stackup', description: 'Layer stackup definition.' },
  { tag: 'copper_finish', description: 'PCB copper finish specification.' },
  { tag: 'dielectric_constraints', description: 'Dielectric constraint settings.' },
  { tag: 'edge_connector', description: 'Edge connector specification.' },
  { tag: 'castellated_pads', description: 'Castellated pad setting.' },
  { tag: 'edge_plating', description: 'Edge plating setting.' },
  { tag: 'pad_to_mask_clearance', description: 'Pad to solder mask clearance.' },
  { tag: 'solder_mask_min_width', description: 'Minimum solder mask width.' },
  { tag: 'pad_to_paste_clearance', description: 'Pad to paste mask clearance.' },
  { tag: 'pad_to_paste_clearance_ratio', description: 'Pad to paste clearance ratio.' },
  { tag: 'allow_soldermask_bridges_in_footprints', description: 'Allow solder mask bridges.' },
  { tag: 'pcbplotparams', description: 'Plot/export configuration parameters.' },
  { tag: 'aux_axis_origin', description: 'Auxiliary axis origin point.' },
  { tag: 'grid_origin', description: 'Grid origin point.' },
  // pcbplotparams sub-nodes
  { tag: 'layerselection', description: 'Layer selection bitmask for plotting.' },
  { tag: 'plot_on_all_layers_selection', description: 'Layers to add to all plots.' },
  { tag: 'disableapertmacros', description: 'Disable Gerber aperture macros.' },
  { tag: 'usegerberextensions', description: 'Use Gerber X2 extensions.' },
  { tag: 'usegerberattributes', description: 'Include Gerber attributes.' },
  { tag: 'usegerberadvancedattributes', description: 'Include advanced Gerber attributes.' },
  { tag: 'creategerberjobfile', description: 'Generate a Gerber job file.' },
  { tag: 'svguseinch', description: 'Use inches in SVG output.' },
  { tag: 'svgprecision', description: 'SVG coordinate precision.' },
  { tag: 'excludeedgelayer', description: 'Exclude board edge from plot.' },
  { tag: 'plotframeref', description: 'Plot drawing frame/border.' },
  { tag: 'viasonmask', description: 'Plot vias on solder mask.' },
  { tag: 'mode', description: 'Plot mode.' },
  { tag: 'useauxorigin', description: 'Use auxiliary axis as plot origin.' },
  { tag: 'hpglpennumber', description: 'HPGL pen number.' },
  { tag: 'hpglpenspeed', description: 'HPGL pen speed.' },
  { tag: 'hpglpendiameter', description: 'HPGL pen diameter.' },
  { tag: 'dxfpolygonmode', description: 'DXF polygon drawing mode.' },
  { tag: 'dxfimperialunits', description: 'Use imperial units for DXF.' },
  { tag: 'dxfusepcbnewfont', description: 'Use KiCad font for DXF.' },
  { tag: 'psnegative', description: 'Generate negative PostScript.' },
  { tag: 'psa4output', description: 'Use A4 format for PostScript.' },
  { tag: 'plotreference', description: 'Include reference designators in plot.' },
  { tag: 'plotvalue', description: 'Include values in plot.' },
  { tag: 'plotfptext', description: 'Include footprint text in plot.' },
  { tag: 'plotinvisibletext', description: 'Include invisible text in plot.' },
  { tag: 'sketchpadsonfab', description: 'Sketch pads on fab layer.' },
  { tag: 'subtractmaskfromsilk', description: 'Subtract mask from silkscreen.' },
  { tag: 'outputformat', description: 'Plot output format.' },
  { tag: 'drillshape', description: 'Drill shape representation.' },
  { tag: 'scaleselection', description: 'Plot scale selection.' },
  { tag: 'outputdirectory', description: 'Plot output directory path.' },
  { tag: 'pdf_front_fp_property_popups', description: 'PDF front side property popups.' },
  { tag: 'pdf_back_fp_property_popups', description: 'PDF back side property popups.' },
  { tag: 'pdf_metadata', description: 'Include metadata in PDF.' },
  // Footprint sub-nodes
  { tag: 'descr', description: 'Footprint description.' },
  { tag: 'tags', description: 'Footprint search tags.' },
  { tag: 'path', description: 'Schematic symbol path this footprint is linked to.' },
  { tag: 'attr', description: 'Footprint attributes (SMD, through-hole, etc.).' },
  { tag: 'solder_mask_margin', description: 'Solder mask margin override.' },
  { tag: 'solder_paste_margin', description: 'Solder paste margin override.' },
  { tag: 'solder_paste_margin_ratio', description: 'Solder paste margin ratio.' },
  { tag: 'clearance', description: 'Clearance override.' },
  { tag: 'zone_connect', description: 'Zone connection style.' },
  { tag: 'thermal_width', description: 'Thermal spoke width.' },
  { tag: 'thermal_gap', description: 'Thermal relief gap.' },
  { tag: 'net_tie_pad_groups', description: 'Net tie pad group definitions.' },
  { tag: 'fp_line', description: 'Footprint line graphic.' },
  { tag: 'fp_arc', description: 'Footprint arc graphic.' },
  { tag: 'fp_circle', description: 'Footprint circle graphic.' },
  { tag: 'fp_rect', description: 'Footprint rectangle graphic.' },
  { tag: 'fp_poly', description: 'Footprint polygon graphic.' },
  { tag: 'fp_curve', description: 'Footprint bezier curve.' },
  { tag: 'fp_text', description: 'Footprint text item.' },
  { tag: 'fp_text_box', description: 'Footprint text box.' },
  { tag: 'fp_bezier', description: 'Footprint bezier graphic.' },
  { tag: 'model', description: '3D model reference for the footprint.' },
  { tag: 'rotate', description: '3D model rotation.' },
  { tag: 'dnp', description: 'Do not populate flag.' },
  // Pad sub-nodes
  { tag: 'pad', description: 'Pad definition inside a footprint.' },
  { tag: 'drill', description: 'Drill hole specification.' },
  { tag: 'net', description: 'Net assignment.' },
  { tag: 'net_name', description: 'Net name.' },
  { tag: 'roundrect_rratio', description: 'Rounded rectangle corner ratio.' },
  { tag: 'chamfer_ratio', description: 'Chamfer ratio.' },
  { tag: 'chamfer', description: 'Chamfer corner specification.' },
  { tag: 'primitive', description: 'Custom pad primitive shapes.' },
  { tag: 'options', description: 'Pad options.' },
  { tag: 'anchor', description: 'Pad anchor specification.' },
  // Via sub-nodes
  { tag: 'locked', description: 'Lock an item from editing.' },
  { tag: 'free', description: 'Mark a via as free to move.' },
  { tag: 'remove_unused_layers', description: 'Remove copper on unused layers.' },
  { tag: 'keep_end_layers', description: 'Keep end layers for buried vias.' },
  // Teardrops
  { tag: 'teardrops', description: 'Teardrop settings.' },
  { tag: 'td_allow_use_two_tracks', description: 'Allow two-track teardrops.' },
  { tag: 'td_allow_use_routing_layer', description: 'Allow routing layer for teardrops.' },
  { tag: 'td_target_name', description: 'Teardrop target name.' },
  { tag: 'td_onpadsmd', description: 'Teardrops on SMD pads.' },
  { tag: 'td_onroundshapesonly', description: 'Teardrops on round shapes only.' },
  { tag: 'td_ontrackend', description: 'Teardrops on track ends.' },
  { tag: 'td_onviapad', description: 'Teardrops on via pads.' },
  // Zone sub-nodes
  { tag: 'hatch', description: 'Hatch pattern for zone boundaries.' },
  { tag: 'priority', description: 'Zone fill priority.' },
  { tag: 'connect_pads', description: 'Pad connection settings for zone.' },
  { tag: 'min_thickness', description: 'Minimum copper thickness in zone.' },
  { tag: 'filled_areas_thickness', description: 'Filled area thickness flag.' },
  { tag: 'teardrop_type', description: 'Zone teardrop type.' },
  { tag: 'keepouts', description: 'Keepout area restrictions.' },
  { tag: 'polygon', description: 'Zone outline polygon.' },
  { tag: 'filled_polygon', description: 'Filled copper polygon in zone.' },
  { tag: 'island_removal_mode', description: 'Copper island removal mode.' },
  { tag: 'island_area_min', description: 'Minimum copper island area.' },
  // Dimension sub-nodes
  { tag: 'format', description: 'Dimension value format settings.' },
  { tag: 'style', description: 'Dimension line style.' },
  { tag: 'suppress_zeroes', description: 'Suppress trailing zeroes in dimension.' },
  { tag: 'override_value', description: 'Override dimension display value.' },
  { tag: 'precision', description: 'Dimension value precision.' },
  { tag: 'units', description: 'Units for dimension display.' },
  { tag: 'units_format', description: 'Format for dimension units label.' },
  { tag: 'prefix', description: 'Dimension value prefix.' },
  { tag: 'suffix', description: 'Dimension value suffix.' },
  { tag: 'arrow_length', description: 'Dimension arrow length.' },
  { tag: 'text_position_mode', description: 'Dimension text position mode.' },
  { tag: 'extension_height', description: 'Dimension extension line height.' },
  { tag: 'text_frame', description: 'Dimension text frame style.' },
  { tag: 'extension_offset', description: 'Dimension extension line offset.' },
  { tag: 'keep_text_aligned', description: 'Keep dimension text aligned with line.' },
  // Legacy identifiers
  { tag: 'tstamp', description: 'Legacy timestamp identifier (older format).' },
  { tag: 'tedit', description: 'Legacy edit timestamp (older format).' },
  // Group
  { tag: 'members', description: 'UUIDs of items in a group.' },
  // Segment / arc track
  { tag: 'segment', description: 'Copper track segment.' },
  ...commonNodes
];

export const SYMBOL_SCHEMA: SchemaNodeDefinition[] = [
  // Root
  { tag: 'kicad_symbol_lib', description: 'Root node for KiCad symbol library files.' },
  // Symbol definition
  { tag: 'symbol', description: 'Symbol definition.' },
  { tag: 'unit', description: 'Symbol unit (multi-unit or DeMorgan).' },
  { tag: 'unit_name', description: 'Human-readable unit label.' },
  { tag: 'extends', description: 'Parent symbol this one extends.' },
  { tag: 'convert', description: 'DeMorgan alternate body style.' },
  // Symbol attributes
  { tag: 'in_bom', description: 'Include in bill of materials.' },
  { tag: 'on_board', description: 'Include on PCB board.' },
  { tag: 'exclude_from_sim', description: 'Exclude from simulation.' },
  { tag: 'exclude_from_bom', description: 'Exclude from BOM.' },
  { tag: 'exclude_from_board', description: 'Exclude from board.' },
  { tag: 'power', description: 'Marks symbol as a power symbol.' },
  // Pin definition
  { tag: 'pin', description: 'Pin definition.' },
  { tag: 'pin_numbers', description: 'Pin number display settings.' },
  { tag: 'pin_names', description: 'Pin name display settings.' },
  { tag: 'electrical_type', description: 'Electrical type of a pin.' },
  { tag: 'graphic_style', description: 'Graphic style of a pin.' },
  { tag: 'direction', description: 'Pin direction.' },
  // Property attributes
  { tag: 'show_name', description: 'Show property name alongside value.' },
  { tag: 'do_not_autoplace', description: 'Suppress auto-placement.' },
  // Simulation model
  { tag: 'simulation_model', description: 'SPICE/simulation model.' },
  ...commonNodes
];

export const FOOTPRINT_SCHEMA: SchemaNodeDefinition[] = [
  // Root
  { tag: 'footprint', description: 'Root node for KiCad footprint files.' },
  // Footprint metadata
  { tag: 'descr', description: 'Footprint description.' },
  { tag: 'tags', description: 'Search tags.' },
  { tag: 'attr', description: 'Attributes (SMD, through-hole, etc.).' },
  // Footprint graphics
  { tag: 'fp_line', description: 'Footprint line graphic.' },
  { tag: 'fp_arc', description: 'Footprint arc graphic.' },
  { tag: 'fp_circle', description: 'Footprint circle graphic.' },
  { tag: 'fp_rect', description: 'Footprint rectangle graphic.' },
  { tag: 'fp_poly', description: 'Footprint polygon graphic.' },
  { tag: 'fp_curve', description: 'Footprint bezier curve.' },
  { tag: 'fp_text', description: 'Footprint text item.' },
  { tag: 'fp_text_box', description: 'Footprint text box.' },
  { tag: 'fp_bezier', description: 'Footprint bezier graphic.' },
  // Pad
  { tag: 'pad', description: 'Pad definition.' },
  { tag: 'drill', description: 'Drill hole specification.' },
  { tag: 'net', description: 'Net assignment.' },
  { tag: 'net_name', description: 'Net name.' },
  { tag: 'roundrect_rratio', description: 'Rounded rectangle corner ratio.' },
  { tag: 'chamfer_ratio', description: 'Chamfer ratio.' },
  { tag: 'chamfer', description: 'Chamfer corner specification.' },
  { tag: 'primitive', description: 'Custom pad primitive shapes.' },
  { tag: 'options', description: 'Pad options.' },
  { tag: 'anchor', description: 'Pad anchor specification.' },
  // Footprint overrides
  { tag: 'solder_mask_margin', description: 'Solder mask margin override.' },
  { tag: 'solder_paste_margin', description: 'Solder paste margin override.' },
  { tag: 'solder_paste_margin_ratio', description: 'Solder paste margin ratio.' },
  { tag: 'clearance', description: 'Clearance override.' },
  { tag: 'zone_connect', description: 'Zone connection style.' },
  { tag: 'thermal_width', description: 'Thermal spoke width.' },
  { tag: 'thermal_gap', description: 'Thermal relief gap.' },
  { tag: 'net_tie_pad_groups', description: 'Net tie pad group definitions.' },
  { tag: 'allow_soldermask_bridges_in_footprints', description: 'Allow solder mask bridges.' },
  // 3D model
  { tag: 'model', description: '3D model reference.' },
  { tag: 'rotate', description: '3D model rotation.' },
  // Sub-elements
  { tag: 'zone', description: 'Copper zone within footprint.' },
  { tag: 'group', description: 'Group of items.' },
  { tag: 'dnp', description: 'Do not populate flag.' },
  { tag: 'locked', description: 'Lock item from editing.' },
  // Legacy
  { tag: 'tstamp', description: 'Legacy timestamp identifier.' },
  { tag: 'tedit', description: 'Legacy edit timestamp.' },
  ...commonNodes
];

export const PROJECT_SCHEMA: SchemaNodeDefinition[] = [
  { tag: 'meta', description: 'KiCad project metadata.' },
  { tag: 'board', description: 'PCB project configuration.' },
  { tag: 'schematic', description: 'Schematic project configuration.' },
  { tag: 'variants', description: 'KiCad 10 design variant definitions.' },
  { tag: 'activeVariant', description: 'Currently active design variant.' }
];

export const DRC_SCHEMA: SchemaNodeDefinition[] = [
  {
    tag: 'design_rules',
    description: 'Root node for KiCad custom DRC rule files.'
  },
  { tag: 'version', description: 'DRC rule file format version.' },
  { tag: 'rule', description: 'Named design rule.' },
  {
    tag: 'condition',
    description: 'Boolean condition determining when the rule applies.'
  },
  {
    tag: 'constraint',
    description: 'Constraint payload enforced by the rule.'
  },
  { tag: 'severity', description: 'Severity of the rule outcome.' },
  { tag: 'layer', description: 'Board layer targeted by the rule.' },
  { tag: 'min', description: 'Minimum value for a constraint range.' },
  { tag: 'max', description: 'Maximum value for a constraint range.' },
  { tag: 'opt', description: 'Optimal value for a constraint range.' },
  { tag: 'clearance', description: 'Electrical clearance constraint.' },
  { tag: 'courtyard_clearance', description: 'Courtyard clearance constraint.' },
  { tag: 'silk_clearance', description: 'Silkscreen clearance constraint.' },
  { tag: 'edge_clearance', description: 'Board-edge clearance constraint.' },
  { tag: 'hole_clearance', description: 'Hole-to-copper clearance constraint.' },
  { tag: 'hole_to_hole', description: 'Hole-to-hole spacing constraint.' },
  { tag: 'via_clearance', description: 'Via-to-copper clearance constraint.' },
  { tag: 'track_width', description: 'Track width constraint.' },
  { tag: 'annular_width', description: 'Annular ring width constraint.' },
  { tag: 'via_diameter', description: 'Via diameter constraint.' },
  { tag: 'via_hole', description: 'Via drill hole constraint.' },
  { tag: 'hole_size', description: 'Drill hole size constraint.' },
  { tag: 'length', description: 'Net length constraint.' },
  { tag: 'skew', description: 'Differential-pair skew constraint.' },
  { tag: 'diff_pair_gap', description: 'Differential-pair gap constraint.' },
  {
    tag: 'diff_pair_uncoupled',
    description: 'Differential-pair uncoupled-length constraint.'
  },
  { tag: 'impedance', description: 'Impedance constraint.' },
  {
    tag: 'physical_clearance',
    description: 'Physical (non-electrical) clearance constraint.'
  },
  {
    tag: 'physical_hole_clearance',
    description: 'Physical hole clearance constraint.'
  },
  ...commonNodes
];

export const LANGUAGE_SCHEMAS: Record<string, SchemaNodeDefinition[]> = {
  'kicad-schematic': SCHEMATIC_SCHEMA,
  'kicad-pcb': PCB_SCHEMA,
  'kicad-symbol': SYMBOL_SCHEMA,
  'kicad-footprint': FOOTPRINT_SCHEMA,
  'kicad-project': PROJECT_SCHEMA,
  'kicad-drc': DRC_SCHEMA
};

export const KEYWORD_DESCRIPTIONS = Object.fromEntries(
  Object.entries(LANGUAGE_SCHEMAS).map(([language, items]) => [
    language,
    new Map(items.map((item) => [item.tag, item.description]))
  ])
);

export const LANGUAGE_COMPLETIONS = Object.fromEntries(
  Object.entries(LANGUAGE_SCHEMAS).map(([language, items]) => [
    language,
    items.map((item) => item.tag)
  ])
);
