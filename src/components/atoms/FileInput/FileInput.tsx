/* eslint css-modules/no-unused-class: [2, {camelCase: true, markAsUsed: ['is-outlined'] }] */

import { IconReload, IconTrashXFilled } from "@tabler/icons-react";
import { clsx } from "clsx";
import { debounce, uniqueId } from "lodash-es";
import { useMemo, useState } from "react";
import { UPLOAD_FILE_STATUS } from "../../../tools/uploadFile.js";
import { Button } from "../Button/index.js";
import CircleProgress from "../CircleProgress/CircleProgress.js";
import Spinner from "../Spinner/Spinner.js";
// eslint-disable-next-line css-modules/no-unused-class
import formStyles from "../form.module.css";
import TextInput from "../TextInput/TextInput.js";
import styles from "./fileInput.module.css";

export const variants = ["basic", "outlined", "dashed", "borderless"];

export default function FileInput({
  size = "medium",
  iconBefore,
  iconAfter,
  label,
  variant,
  onFocus,
  onBlur,
  id,
  isBusy,
  spacing,
  className,
  innerClassNames = {},
  files,
  updateFiles,
  uploadFiles,
  placeholder = "Browse",
  onChange,
  ...props
}: any) {
  const [hasFocus, setHasFocus] = useState(false);
  const fileInputID = useMemo(() => id || uniqueId("fileInput_"), [id]);

  const handleFocus = (event) => {
    setHasFocus(true);
    if (onFocus) {
      onFocus(event);
    }
  };
  const handleBlur = (event) => {
    setHasFocus(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  const handleChange = (event) => {
    if (event.target.files.length > 0) {
      updateFiles([...event.target.files], "add");
    }
    if (onChange) {
      onChange(event);
    }
  };

  const handleDataChange = debounce((event, file, dataIndex) => {
    const fileData = [...file.data];
    fileData[dataIndex].value = event.target.value;
    updateFiles([{ ...file, data: fileData }], "update");
  }, 500);

  return (
    <div className={clsx(className)}>
      <label
        className={clsx(
          formStyles[`is-${size}`],
          styles.wrapper,
          styles[`is-${variant}`],
          {
            // eslint-disable-next-line css-modules/no-undef-class
            [styles.hasFocus]: hasFocus,
          }
        )}
      >
        {label ? <span className={styles.label}>{label}</span> : null}
        {iconBefore ? (
          <span className={clsx(styles.iconWrapper)}>
            <span className={clsx(formStyles.icon)}>{iconBefore}</span>
          </span>
        ) : null}
        <input
          id={fileInputID}
          type="file"
          className={clsx(styles.input)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        <span className={clsx(styles.placeholder, innerClassNames.input)}>
          {placeholder}
        </span>
        {iconAfter ? (
          <span className={clsx(styles.iconWrapper, styles.iconRight)}>
            <span className={clsx(formStyles.icon)}>{iconAfter}</span>
          </span>
        ) : null}
        {isBusy ? <Spinner className={styles.spinner} /> : null}
      </label>
      {files && files.length > 0 ? (
        <div>
          {files.map((item, index) => (
            <div key={index}>
              <div className={styles.listItem} key={index}>
                <div className={styles.listItemText}>{item.file.name}</div>
                {item.status === UPLOAD_FILE_STATUS.uploading ? (
                  <>
                    <div
                      className={clsx(
                        styles.listItemStatusText,
                        styles.progress
                      )}
                    >
                      Uploading...
                    </div>
                    <div>
                      <CircleProgress
                        squareSize={18}
                        progress={item.progress}
                        className={styles.listItemProgress}
                      />
                    </div>
                  </>
                ) : item.status === UPLOAD_FILE_STATUS.uploaded ? (
                  <>
                    <div
                      className={clsx(
                        styles.listItemStatusText,
                        styles.success
                      )}
                    >
                      Uploaded
                    </div>
                    <div>
                      <Button
                        onClick={() => updateFiles([item], "remove")}
                        variant="trans"
                        spacing="equal"
                      >
                        <IconTrashXFilled />
                      </Button>
                    </div>
                  </>
                ) : item.status === UPLOAD_FILE_STATUS.failed ? (
                  <>
                    <div
                      className={clsx(styles.listItemStatusText, styles.failed)}
                    >
                      Failed
                    </div>
                    <div>
                      <Button
                        onClick={() => uploadFiles([item])}
                        variant="trans"
                        spacing="equal"
                      >
                        <IconReload />
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => updateFiles([item], "remove")}
                        variant="trans"
                        spacing="equal"
                      >
                        <IconTrashXFilled />
                      </Button>
                    </div>
                  </>
                ) : null}
              </div>
              {item.data && item.data.length > 0
                ? item.data.map((dataItem, dataIndex) =>
                    dataItem.type === "password" ? (
                      <TextInput
                        innerClassNames={{ input: styles.listItemDataInput }}
                        key={index}
                        size="small"
                        onChange={(event) =>
                          handleDataChange(event, item, dataIndex)
                        }
                        defaultValue={dataItem.value}
                        label={dataItem.label}
                        placeholder={dataItem.placeholder}
                        type={dataItem.type || "text"}
                      />
                    ) : dataItem.type === "preview" ? (
                      <img
                        id={dataItem.resource}
                        src={dataItem.resource}
                        alt={dataItem.name}
                        className={styles.previewImage}
                      />
                    ) : null
                  )
                : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
