import styles from './field-mask.module.css'

const ROWS = 6
const COLUMNS = 7
const CELL_SIZE = 3
const PADDING_SIDE = 1
const PADDING_TOP = 0.5
const PADDING_BOTTOM = 3

const paddingSideInCells = PADDING_SIDE / CELL_SIZE
const paddingTopInCells = PADDING_TOP / CELL_SIZE
const paddingBottomInCells = PADDING_BOTTOM / CELL_SIZE

const IMAGE_URL = '/field.png'

function Mask() {
  return (
    <mask id="holes-mask">
      <rect
        width={COLUMNS + paddingSideInCells * 2}
        height={ROWS + paddingTopInCells + paddingBottomInCells}
        fill="white"
      />
      <g fill="black">
        {[...Array(ROWS)].map((_, y) =>
          [...Array(COLUMNS)].map((_, x) => (
            <circle
              key={`${x}-${y}`}
              cx={x + 0.5 + paddingSideInCells}
              cy={y + 0.5 + paddingTopInCells}
              r={0.4167}
            />
          )),
        )}
      </g>
    </mask>
  )
}

function ImagePattern() {
  return (
    <pattern
      id="picture-pattern"
      x="0"
      y="0"
      width="1"
      height="1"
      patternUnits="objectBoundingBox"
    >
      <image
        href={IMAGE_URL}
        x="0"
        y="0"
        width={COLUMNS + paddingSideInCells * 2}
        height={ROWS + paddingTopInCells + paddingBottomInCells}
        preserveAspectRatio="xMidYMid slice"
      />
    </pattern>
  )
}

export default function FieldMask() {
  return (
    <div
      className={styles.mask}
      style={{
        width: `calc(${CELL_SIZE}rem * ${COLUMNS} + ${PADDING_SIDE * 2}rem)`,
        height: `calc(${CELL_SIZE}rem * ${ROWS} + ${PADDING_TOP}rem + ${PADDING_BOTTOM}rem)`,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${COLUMNS + paddingSideInCells * 2} ${ROWS + paddingTopInCells + paddingBottomInCells}`}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <defs>
          <ImagePattern />
          <Mask />
        </defs>

        <rect
          width={COLUMNS + paddingSideInCells * 2}
          height={ROWS + paddingTopInCells + paddingBottomInCells}
          fill="url(#picture-pattern)"
          mask="url(#holes-mask)"
        />
      </svg>
    </div>
  )
};