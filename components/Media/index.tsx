import Media from "./Media"
import Image from "./Image"

interface MediaComponent {
    Image: typeof Image
}

type MediaType = typeof Media & MediaComponent

const _Media = Media as MediaType

_Media.Image = Image

export default _Media