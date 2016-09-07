import gulp from "gulp";
import proxy from "@axis/camera-proxy";

gulp.task("proxy", () => {
  const server = proxy({
    target: "192.168.0.90",
    root: `${__dirname}/build`
  });

  server.listen(8080);
});