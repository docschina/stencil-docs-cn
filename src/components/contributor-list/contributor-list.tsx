import { Component, Prop, h } from "@stencil/core";


@Component({
  tag: 'contributor-list',
  styleUrl: 'contributor-list.css'
})
export class ContributorList {

  @Prop() contributors?: string[];

  render() {
    const contributors = this.contributors;
    if (!contributors || contributors.length === 0) {
      return null;
    }

    return (
      <section>
        <div>
          <h5>Translators</h5>
          <div>
            <ul>
            <li>
                <a rel="noopener" href={`https://github.com/Howie126313`} target="_blank">
                  <span class="img-wrapper">
                    <img
                      src={`https://github.com/Howie126313.png?size=90`}
                      loading="lazy"
                      width="32"
                      height="32"
                      title={`Contributor Howie126313`}
                      importance="low"/>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <h5>Contributors</h5>
        <div>
          <ul>
          {contributors.map(contributor => (
            <li>
              <a rel="noopener" href={`https://github.com/${contributor}`} target="_blank">
                <span class="img-wrapper">
                  <img
                    src={`https://github.com/${contributor}.png?size=90`}
                    loading="lazy"
                    width="32"
                    height="32"
                    title={`Contributor ${contributor}`}
                    importance="low"/>
                </span>
              </a>
            </li>
          ))}
          </ul>
        </div>
      </section>
    );
  }
}
